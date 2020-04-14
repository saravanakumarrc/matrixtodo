using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
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
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [BsonElement("description")]
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [BsonElement("estimate")]
        [JsonProperty(PropertyName = "estimate")]
        public int Estimate { get; set; }

        [BsonElement("label")]
        [JsonProperty(PropertyName = "label")]
        public string Label { get; set; }

        [BsonElement("order")]
        [JsonProperty(PropertyName = "order")]
        public int Order { get; set; }

        [BsonElement("taskGroup")]
        [JsonProperty(PropertyName = "taskGroup")]
        public string TaskGroup { get; set; }

        [BsonElement("status")]
        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }

        [BsonElement("createdOn")]
        [JsonProperty(PropertyName = "createdOn")]
        public DateTime CreatedOn { get; set; }
    }
}
