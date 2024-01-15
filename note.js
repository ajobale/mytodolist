(function () {
  var mytodolist = {
    STORAGE_KEY: "mytodolist",

    init() {
      // 1.prepare Database : local storage (website memory)
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        //2. Provide Default Data
        this.generateDefaultData();
      }
      //3.render template based on Data & Bind Events
      this.renderData();
      //4.create event for crate
      this.attachCreateEvent();

      //dom dapetin class
      var elCompleteAll = document.querySelector("#complete-all");
      var elRemoveAll = document.querySelector("#remove-all");

      elCompleteAll.addEventListener("click", (e) => {
        e.preventDefault();
        // kalau diklik
        var todoContainer = document.querySelector("#todo-container");
        var checkboxes = todoContainer.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach((cbox) => {
          if (!cbox.cheked) {
            cbox.click();
          }
        });
      });

      //6. just for confirming

      elRemoveAll.addEventListener("click", (e) => {
        e.preventDefault();
        if (!confirm("Are you sure to remove all todolist?")) {
          return;
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));

        this.renderData();
      });
    },
    getAllData() {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },

    attachCreateEvent() {
      var form = document.querySelector("form#form-todo");
      var inputTodo = form.querySelector("input[name=todo]");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!inputTodo.value) {
          inputTodo.classList.add("is-danger");
          return;
        }

        inputTodo.classList.remove("id-danger");

        var collection = this.getAllData();
        varnewId = collection.lenght
          ? collection[collection.lenght - 1].id + 1
          : 1;

        collection.push({
          id: newId,
          status: false,
          content: inputTodo.value,
        });

        inputTodo.value = "";
        this.refreshContent(collection);
      });
    },

    renderData() {
      var data = this.getAllData();
      var todoContainer = document.querySelector("#todo=container");
      todoContainer.innerHTML = "";

      if (data.length < 1) {
        todoContainer.appendChild(this.tplEmpty());
      }

      data.forEach((item, index) => {
        var elItem = this.tplItem(item.id, item);
        todoContainer.appendChild(elItem);
      });
    },

    generateDefaultData() {
      console.log("//2. Provide Default Data");
      var dummies = [
        {
          id: 1,
          status: true,
          content: "Main di free4talk",
        },
        {
          id: 2,
          status: false,
          content: "Belajar JS Fundamental",
        },
        {
          id: 3,
          status: false,
          content: "Tidur nyenak",
        },
        {
          id: 3,
          status: false,
          content: "Move on XD",
        },
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dummies));
    },

    // template

    tplEmpty() {
      var container = document.createElement("div");
      container.classList.add(
        "list-item",
        "has-text-centered",
        "has-text-black"
      );
      container.innerText = "You had empty todo-list";
      return container;
    },

    tplItem(id, data) {
      var elWrapper = document.createElement("div");
      elWrapper.classList.add("todo-item", "list-item", "is-clearfiz");
      elWrapper.setAttribute("data-id", id);

      var elStatus = document.createElement("div");
      elStatus.classList.add("todo-status", "is-pulled-left");

      var elStatusLabel = document.createElement("label");
      var elStatusCheckbox = document.createElement("input");
      elStatusLabel.classList.add("chckbox");
      elStatusCheckbox.setAttribute("type", "checkbox");

      var elContent = document.createElement("div");
      var elActionDelete = document.createElement("a");

      elActionDelete.classList.add(
        "todo-action",
        "is-pulled-rigth",
        "has-text-right"
      );
      elActionDelete.classList.add(
        "todo-delete",
        "button",
        "is-small",
        "is-danger"
      );
      elActionDelete.setAttribute("data-id", id);
      elActionDelete.innerText = "Delete";
      elActionDelete.appendChild(elActionDelete);

      elStatusLabel.appendChild(elStatusChekbox);
      elStatus.appendChild(elStatusLabel);
      elWrapper.appendChild(elStatus);
      elWrapper.appendChild(elContent);
      elWrapper.appendChild(elAction);

      if (data.status) {
        elWrapper.classList.add("has-background-succes", "has-text-white");
        elStatusCheckbox = true;
      }

      elStatusCheckbox.addEventListener(
        "change",
        this.toggleCompleteEvent.bind(this)
      );
      return elWrapper;
    },

    toggleCompleteEvent(e) {
      var elCheckbox = e.target;
      var elItemWrapper = elCheckbox.closest(".todo-item");
      var id = elItemWrapper.getAttribute("data-id");

      var updated = this.getAllData().map((obj) => {
        if (obj.id === parseInt(id)) {
          return Object.assign(obj, { status: elChekbox.checked });
        }
        return obj;
      });

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));

      if (elCheckbox.cheked) {
        elItemWrapper.classList.add("has-background-success", "has=text-white");
      } else {
        elItemWrapper.classList.remove(
          "has-background-success",
          "has-text-white"
        );
      }
    },
    deleteEvent(e) {
      e.preventDefault();
      if (!confirm("are you sure?")) {
        return;
      }

      var id = e.target.getAttribute("data-id");
      var collection = this.getAllData().filter((obj) => {
        return obj.id !== parseInt(id);
      });
      this.refreshContent(collection);
    },
  };
  mytodolist.init();
});
