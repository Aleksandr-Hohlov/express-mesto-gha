module.exports.err500 = 500;
module.exports.err400 = 400;
module.exports.err404 = 404;
module.exports.messageErrDefault = 'Ошибка по умолчанию';

module.exports.ValidationError = 'ValidationError';
module.exports.CastError = 'CastError';

module.exports.messageErr = {
  notFound: {
    page: 'Страница не найдена',
    user: 'Пользователь с указанным _id не найден',
    card: 'Карточка с указанным _id не найдена',
    cardLike: 'Передан несуществующий _id карточки',
  },

  badRequest: {
    card: 'Переданы некорректные данные при создании карточки',
    cardLike: 'Переданы некорректные данные для постановки/снятии лайка',
    getUserById: 'Некорректный _id при поиске пользователя',
    createUser: 'Переданы некорректные данные при создании пользователя',
    updateUserInfo: 'Переданы некорректные данные при обновлении профиля',
    updateAvatar: 'Переданы некорректные данные при обновлении аватара',
  },
};
