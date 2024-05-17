const router = require('express').Router();
const chainService= require('../services/chainService')
// router.post('/createChatRoom', async (req, res) => {
//     const { message, receiver } = req.body;
//     try {
//         let chatRoom = await messageService.createChatRoom(req.user._id, receiver)
//         await ChatRoom.updateOne({ _id: chatRoom._id }, { $push: { conversation: { senderId: req.user._id, message } } })
//         res.status(200).json({ messageId: chatRoom._id })
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

router.post('/chat', async (req, res) => {
    console.log("entered the function ------------------------------------------------------------------------")
    console.log(req);
    const body = await req.body;
    const question = body.query;
    const history= body.history ?? []
    chain = chainService.chain
    resp = await chain.call({
            question: question,
            chat_history: history.map(h => h.content).join("\n"),
        });

    console.log(resp.sourceDocuments)

    const links = Array.from(new Set(resp.sourceDocuments.map(document => document.metadata.source)));
    finalResp = JSON.stringify({role: "assistant", content: resp.text, links: links})

    //return NextResponse.json({role: "assistant", content: res.text, links: links})
    res.status(200).json({role: "assistant", content: resp.text, links: links})
})



module.exports = router;