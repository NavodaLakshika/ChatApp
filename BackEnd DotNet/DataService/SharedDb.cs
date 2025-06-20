using System.Collections.Concurrent;
using FormulaOne.ChatService.Models;

namespace FormulaOne.ChatService.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections;

        public ConcurrentDictionary<string, UserConnection> Connections => _connections;

        public SharedDb()
        {
            _connections = new ConcurrentDictionary<string, UserConnection>();
        }
    }
}
