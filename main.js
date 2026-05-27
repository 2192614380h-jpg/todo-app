// 从 localStorage 读取已有的任务，没有则用空数组
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const clearBtn = document.getElementById('clearDone');
const totalSpan = document.getElementById('totalCount');
const doneSpan = document.getElementById('doneCount');

// 存到 localStorage
function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 渲染整个列表
function render() {
  list.innerHTML = '';

  if (todos.length === 0) {
    list.innerHTML = '<div class="empty-state">还没有待办事项，添加一个吧 ✨</div>';
  }

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => toggle(index));

    const text = document.createElement('span');
    text.textContent = todo.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '×';
    delBtn.addEventListener('click', () => remove(index));

    li.append(checkbox, text, delBtn);
    list.appendChild(li);
  });

  // 更新计数
  totalSpan.textContent = todos.length;
  doneSpan.textContent = todos.filter((t) => t.done).length;
}

// 添加任务
function add(text) {
  todos.push({ text, done: false });
  save();
  render();
}

// 切换完成状态
function toggle(index) {
  todos[index].done = !todos[index].done;
  save();
  render();
}

// 删除任务
function remove(index) {
  todos.splice(index, 1);
  save();
  render();
}

// 清除已完成
function clearDone() {
  todos = todos.filter((t) => !t.done);
  save();
  render();
}

// 事件绑定
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    add(text);
    input.value = '';
  }
});

clearBtn.addEventListener('click', clearDone);

// 初始渲染
render();
