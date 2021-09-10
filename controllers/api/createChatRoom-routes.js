const router = require('express').Router();
const { User, Chat, UserChat } = require('../../models');
const withAuth = require('../../utils/withAuth');
const sequelize = require('sequelize');

router.post('/welcome', async (req, res) => {
  try {
    let userChatInput = req.body.inputText;
    // console.log(userChatInput);
    const renderChatRooms = await Chat.findAll({
      where: { chat_name: userChatInput }
    });

    console.log(renderChatRooms);
    if (renderChatRooms.length > 0) {
      const createAssociations = UserChat.create({
        UserId: 1,
        ChatId: 4,
        is_owner: 0
      });
    } else {
      const createRoom = Chat.create({
        chat_name: userChatInput
      }).then(response => {
        const createAssociations = UserChat.create({
          UserId: 1,
          ChatId: response.id,
          is_owner: 0
        });
      });
    }

    res.json(renderChatRooms);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userWithChats = await Chat.findAll({
//       include: [{ model: Chat }]
//     });

//     console.log(userWithChats);
//     res.json(userWithChats);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json(e);
//   }
// });

module.exports = router;

/**
 * select a.chat_name from chat a
 * left join user_chat b on a.chat_id = b.chat_id
 * left join user c on b.user_id = c.user_id
 * where c.email = 'nem@gmail.com';
 *
 */