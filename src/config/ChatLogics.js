export const getSender = (loggedUser, chatMembers) => {
    return chatMembers[0]._id === loggedUser._id ? chatMembers[1].name : chatMembers[0].name; 
}