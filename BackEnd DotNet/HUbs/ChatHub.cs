using FormulaOne.ChatService.DataService;
using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace FormulaOne.ChatService.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;

        public ChatHub(SharedDb shared)
        {
            _shared = shared;
        }

        // Called when a user joins the global chat
        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("ReceiveMessage", "Admin", $"{conn.Username} has joined the chat.");
        }

        // Called when a user joins a specific chat room (group)
        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

            _shared.Connections[Context.ConnectionId] = conn;

            await Clients.Group(conn.ChatRoom).SendAsync(
                "ReceiveMessage",
                "Admin",
                $"{conn.Username} has joined {conn.ChatRoom}."
            );
        }

        // Send a message to the specific chat room group
        public async Task SendMessage(string msg)
        {
            if (_shared.Connections.TryGetValue(Context.ConnectionId, out UserConnection? conn))
            {
                await Clients.Group(conn.ChatRoom)
                    .SendAsync("ReceiveMessage", conn.Username, msg);
            }
        }

        // Optionally override OnDisconnectedAsync to clean up connections
        public override async Task OnDisconnectedAsync(System.Exception? exception)
        {
            if (_shared.Connections.TryRemove(Context.ConnectionId, out var conn))
            {
                await Clients.Group(conn.ChatRoom)
                    .SendAsync("ReceiveMessage", "Admin", $"{conn.Username} has left the chat.");
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
