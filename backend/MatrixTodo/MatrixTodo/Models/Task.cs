using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatrixTodo.Models
{
    public class Task
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("estimate")]
        public int Estimate { get; set; }

        [BsonElement("label")]
        public string Label { get; set; }

        [BsonElement("order")]
        public int Order { get; set; }

        [BsonElement("taskGroup")]
        public string TaskGroup { get; set; }

        [BsonElement("createdOn")]
        public DateTime CreatedOn { get; set; }
    }
}
