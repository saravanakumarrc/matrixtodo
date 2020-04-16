using MatrixTodo.Models;
using MatrixTodo.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace TasksApi.Controllers
{
    [EnableCors("CORSPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        // OPTIONS: api/TodoItems2/5
        [HttpOptions("{id}")]
        public IActionResult PreflightRoute(int id)
        {
            return NoContent();
        }

        // OPTIONS: api/TodoItems2 
        [HttpOptions]
        public IActionResult PreflightRoute()
        {
            return NoContent();
        }

        [HttpGet]

        public ActionResult<List<Task>> Get() =>
            _taskService.Get();

        [HttpGet("{id:length(24)}")]
        public ActionResult<Task> Get(string id)
        {
            var task = _taskService.Get(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        [HttpPost]
        public ActionResult<Task> Create(Task task)
        {
            _taskService.Create(task);

            return Get(task.Id);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Task taskIn)
        {
            var task = _taskService.Get(id);

            if (task == null)
            {
                return NotFound();
            }

            _taskService.Update(id, taskIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var task = _taskService.Get(id);

            if (task == null)
            {
                return NotFound();
            }

            _taskService.Remove(task.Id);

            return NoContent();
        }
        [HttpPut]
        public IActionResult Update([System.Web.Http.FromUri] Task[] tasks)
        {
            foreach(var t in tasks)
            {
                var task = _taskService.Get(t.Id);

                if (task == null)
                {
                    return NotFound();
                }

                _taskService.Update(t.Id, t);
            }

            return NoContent();
        }
    }
}