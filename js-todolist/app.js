(() => {
// テンプレートタグ <template> を使えるかチェック
  if ('content' in document.createElement('template')) {
    const $btnSubmit = document.getElementById('js-btn-submit');
    const $formTodo = document.getElementById('js-form-todo');
    const $formValidate = document.getElementById('js-errorMessage');
    let inputTodoText;

    const $template = document.getElementById('js-todoList');
    const $todoWrap = document.getElementById('js-todo');
    const $todoList = document.getElementsByClassName('todo-list');

    const TODOLIST_ID = 'flexCheckDefault';
    const INVALID_CLASS = 'is-invalid';
    const BLOCK_CLASS = 'd-block';
    const ISCHECKED_CLASS = 'is-checked';

    // ---------------- 入力内容チェック、空欄じゃなければTODO表示 ---------------- //
    const formInputCheck = () => {
      if ($formTodo.value === '') {
        $formTodo.classList.add(INVALID_CLASS);
        $formValidate.classList.add(BLOCK_CLASS);
      } else {
        inputTodoText = $formTodo.value;
        $formTodo.value = '';
        $formTodo.classList.remove(INVALID_CLASS);
        $formValidate.classList.remove(BLOCK_CLASS);
        insertTodoList();
      }
    };

    // ---------------- タスクの値をセット、template挿入 ---------------- //
    const insertTodoList = () => {
      const clone = $template.content.cloneNode(true);
      clone.querySelector('.form-check-label').textContent = inputTodoText;
      $todoWrap.appendChild(clone);
      todoListIdSet();
    };

    // ---------------- ラベルとチェックボックスを紐付けるためid・for内を書き換える ---------------- //
    const todoListIdSet = () => {
      let todoIndex = 0;
      while (todoIndex < $todoList.length) {
        let $todoCheckBox = $todoList[todoIndex].querySelector('.form-check-input');
        let $todoLabelText = $todoList[todoIndex].querySelector('.form-check-label');

        $todoCheckBox.id = TODOLIST_ID + todoIndex;
        $todoLabelText.setAttribute('for', TODOLIST_ID + todoIndex);

        $todoCheckBox.addEventListener('click', (e) => todoListChecked(e.target, $todoLabelText));

        $todoList[todoIndex].querySelector('.btn-delete').addEventListener('click', (e) => e.target.parentNode.remove());
        todoIndex++;
      }
    };

    // ---------------- チェックボックスにチェックを入れるとグレーアウト ---------------- //
    const todoListChecked = (check, label) => {
      if (check.checked) {
        label.classList.add(ISCHECKED_CLASS);
      } else {
        label.classList.remove(ISCHECKED_CLASS);
      }
    };

    // ---------------- submitボタンを押すとタスクが追加される ---------------- //
    $btnSubmit.addEventListener('click', () => formInputCheck());
  };
})();