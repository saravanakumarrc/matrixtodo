using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatrixTodo.Models
{
    public class MatrixTodoDatabaseSettings : IMatrixTodoDatabaseSettings
    {
        public string TasksCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
