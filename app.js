document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('task-input');
  const taskDateInput = document.getElementById('task-date');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const clearCompletedButton = document.getElementById('clear-completed');

  const totalTasksCounter = document.getElementById('total-tasks');
  const completedTasksCounter = document.getElementById('completed-tasks');
  const pendingTasksCounter = document.getElementById('pending-tasks');

  let totalTasks = 0;
  let completedTasks = 0;
  let pendingTasks = 0;

  // Actualizar contadores
  function updateCounters() {
      totalTasksCounter.textContent = totalTasks;
      completedTasksCounter.textContent = completedTasks;
      pendingTasksCounter.textContent = pendingTasks;
  }

  // Añadir tarea
  addTaskButton.addEventListener('click', function() {
      const taskText = taskInput.value.trim();
      const taskDate = taskDateInput.value;

      if (taskText && taskDate) {
          const taskItem = document.createElement('li');
          taskItem.classList.add('task');
          
          // Verificar si la fecha ya pasó
          const currentDate = new Date().toISOString().split('T')[0];
          let dateClass = '';
          if (taskDate < currentDate) {
              dateClass = 'due-late'; // Fecha pasada
          } else if (taskDate === currentDate) {
              dateClass = 'due-soon'; // Fecha hoy
          }

          taskItem.innerHTML = `
              <span class="task-text">${taskText}</span>
              <span class="task-date ${dateClass}">${taskDate}</span>
              <button class="delete-task">X</button>
          `;
          taskList.appendChild(taskItem);
          taskInput.value = ''; // Limpiar el campo de entrada
          taskDateInput.value = ''; // Limpiar el campo de fecha

          // Contadores
          totalTasks++;
          pendingTasks++;
          updateCounters();

          // Eliminar tarea
          taskItem.querySelector('.delete-task').addEventListener('click', function() {
              taskList.removeChild(taskItem);
              totalTasks--;
              if (taskItem.classList.contains('completed')) {
                  completedTasks--;
              } else {
                  pendingTasks--;
              }
              updateCounters();
          });

          // Marcar tarea como completada
          taskItem.addEventListener('click', function() {
              taskItem.classList.toggle('completed');
              if (taskItem.classList.contains('completed')) {
                  completedTasks++;
                  pendingTasks--;
              } else {
                  completedTasks--;
                  pendingTasks++;
              }
              updateCounters();
          });
      }
  });

  // Limpiar tareas completadas
  clearCompletedButton.addEventListener('click', function() {
      const completedTasksList = document.querySelectorAll('.task.completed');
      completedTasksList.forEach(task => {
          taskList.removeChild(task);
          totalTasks--;
          completedTasks--;
      });
      updateCounters();
  });
});
