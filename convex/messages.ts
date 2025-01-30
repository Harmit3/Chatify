import { ConvexError,v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { scheduler } from "timers/promises";
import { api } from "./_generated/api";

export const sentTextMessage =mutation({
    args:{
        sender:v.string(),
        content:v.string(),
        conversation:v.id("conversations"),

    },
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new ConvexError("Not authenticated!!");
        }

        const user=await ctx.db
          .query("users")
          .withIndex("by_tokenIdentifier",(q)=>q.eq("tokenIdentifier",identity.tokenIdentifier))
          .unique();
        if(!user){
            throw new ConvexError("User not found");
        }

        const conversation=await ctx.db.query("conversations")
         .filter(q=>q.eq(q.field("_id"),args.conversation)).first();


        if(!conversation){
            throw new ConvexError("Conversation not found!!");
        }

        if(!conversation.participants.includes(user._id)){
            throw new ConvexError("User not in conversation");
        }

        await ctx.db.insert("messages",{
            sender:args.sender,
            content:args.content,
            conversation:args.conversation,
            messageType:"text",
        });

        //OPENAI API's chat
        if(args.content.startsWith("@gpt")){
            //schedule the chatr action immdediatly
            await ctx.scheduler.runAfter(0,api.openai.chat,{
               messageBody:args.content,
               conversation:args.conversation,
            });
        }
    },
});

export const sendChatGPTMessage=mutation({
    args:{
        content:v.string(),
        conversation:v.id("conversations"),
        messageType: v.union(v.literal("text"), v.literal("image")),
    },
    handler:async(ctx,args)=>{
         await ctx.db.insert("messages",{
            content:args.content,
            sender:"ChatGPT",
            messageType:args.messageType,
            conversation:args.conversation,
        });

    },
})

// export const getMessages=query({

//     args:{
//         conversation:v.id("conversations"),
//     },
//     handler:async(ctx,args)=>{
//         const identity=await ctx.auth.getUserIdentity();
//         if(!identity){
//             throw new ConvexError("Not Auuthenticated!!");
//         }

//         const  messages=await ctx.db
//         .query("messages")
//         .withIndex('by_conversation',q=>q.eq("conversation",args.conversation))
//         .collect();


       {/*this is unoptimized since if any user sent 200 messages then it will run by 200 times while 
       we need only once so we need to use hashMap for that which has key and pair value concept*/}

//         const messagesWithSender=await Promise.all(
//             messages.map(async(message)=>{
//                 const sender=await ctx.db
//                 .query("users")
//                 .filter(q=>q.eq(q.field("_id"),message.sender))
//                 .first();

//                 return {...message,sender}
//             })
            
//         )
//         return messagesWithSender;
//     }
// });





//optimized version with hashmap

 export const getMessages=query({

        args:{
            conversation:v.id("conversations"),
        },
        handler:async(ctx,args)=>{
            const identity=await ctx.auth.getUserIdentity();
            if(!identity){
                throw new ConvexError("Not Auuthenticated!!");
            }
    
            const  messages=await ctx.db
            .query("messages")
            .withIndex('by_conversation',q=>q.eq("conversation",args.conversation))
            .collect();

            const userProfileCache=new Map();

            const messagesWithSender=await Promise.all(
                messages.map(async(message)=>{
                    if(message.sender==="ChatGpt"){
                        return{...message,sender:{name:"ChatGPT",image:"/gpt.png"},
                    }
                    }
                    let sender;
                    //check if sender is in cache profile
                    if(userProfileCache.has(message.sender)){
                        sender=userProfileCache.get(message.sender);
                    }else{
                        //fetch sender profile from  the database
                        sender=await ctx.db
                          .query("users")
                          .filter((q)=>q.eq(q.field("_id"),message.sender))
                          .first();
                     //caChe the render profile
                     userProfileCache.set(message.sender,sender);
                    }
                    return {...message,sender};
                })
            );
         return messagesWithSender;

        },
});

export const sendImage=mutation({
    args:{imgId:v.id("_storage"),sender:v.id("users"),conversation:v.id("conversations")},

    handler:async(ctx,args)=>{
    const identity=await ctx.auth.getUserIdentity();
    if(!identity){
        throw new ConvexError("Not Auuthenticated!!");
    }
    
    const  content=(await ctx.storage.getUrl(args.imgId)) as string;

    await ctx.db.insert("messages",{
        content:content,
        sender:args.sender,
        messageType:"image",
        conversation:args.conversation,
    });
  },
});


export const sendVideo = mutation({
	args: { videoId: v.id("_storage"), sender: v.id("users"), conversation: v.id("conversations") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Unauthorized");
		}

		const content = (await ctx.storage.getUrl(args.videoId)) as string;

		await ctx.db.insert("messages", {
			content: content,
			sender: args.sender,
			messageType: "video",
			conversation: args.conversation,
		});
	},
});