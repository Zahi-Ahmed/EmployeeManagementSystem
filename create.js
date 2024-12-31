document.addEventListener("DOMContentLoaded", function () {
    let btn1 = document.getElementById("btn1");
    let div1 = document.getElementById("div1");
    let btn2 = document.getElementById("btn2");
    let div2 = document.getElementById("div2");
    let btn3 = document.getElementById("btn3");
    let div3 = document.getElementById("div3");
    let btn4 = document.getElementById("btn4");
    let div4 = document.getElementById("div4");

    let name1 = document.getElementById("name1");
    let btn5 = document.getElementById("btn5");
    let btn6 = document.getElementById("btn6");
    let btn7 = document.getElementById("btn7");
    let btn8 = document.getElementById("btn8");

    let addadd = document.getElementById("addadd");
    let addundo = document.getElementById("addundo");
    let name2 = document.getElementById("name2");
    let des = document.getElementById("des");

    let listemp = document.getElementById("listemp");
    let list1 = document.getElementById("list1");
    let eledit = document.getElementById("eledit");
    let elrem = document.getElementById("elrem");

    var jk = 0;
    var no = 0;
    let types = [];
    let emps = [];

    class Empl {
        f1() {
            div1.style.display = "block";
            div2.style.display = "none";
            div3.style.display = "none";
            div4.style.display = "none";
        }

        f2() {
            div2.style.display = "block";
            div1.style.display = "none";
            div3.style.display = "none";
            div4.style.display = "none";
            var x = window.localStorage.getItem("types");
            if (x) {
                types = JSON.parse(x);
            }
            var listoftypes = "";
            for (var i = 0; i < types.length; i++) {
                listoftypes += `<option value=${i}>${types[i]}</option>`;
            }
            document.getElementById("select1").innerHTML = listoftypes;
        }

        f3() {
            div3.style.display = "block";
            div4.style.display = "none";
            div2.style.display = "none";
            div1.style.display = "none";
            var x = window.localStorage.getItem("types");
            if (x) {
                types = JSON.parse(x);
            }
            var listoftypes = "";
            for (var i = 0; i < types.length; i++) {
                listoftypes += `<li id=${types[i]}>${types[i]}</li>`;
            }
            document.getElementById("listemp").innerHTML = listoftypes;

            let devs = [];
            var y = window.localStorage.getItem("emps");
            if (y) {
                emps = JSON.parse(y);
            }

            for (var i = 0; i < emps.length; i++) {
                if (emps[i].addtype === types[0]) {
                    devs.push(emps[i].addname);
                }
            }

            var listoftypes = "";
            for (var i = 0; i < devs.length; i++) {
                listoftypes += `<li idx=${devs[i]}>${devs[i]}</li><br>`;
            }
            document.getElementById("list1").innerHTML = listoftypes;
        }

        f4() {
            div4.style.display = "block";
            div3.style.display = "none";
            div2.style.display = "none";
            div1.style.display = "none";
            var x = window.localStorage.getItem("types");
            if (x) {
                types = JSON.parse(x);
            }
            var listoftypes = "";
            for (var i = 0; i < types.length; i++) {
                listoftypes += `<option value=${i}>${types[i]}</option>`;
            }
            document.getElementById("select2").innerHTML = listoftypes;
        }
    }

    class CreateType {
        f6() {
            div4.style.display = "none";
            div3.style.display = "none";
            div2.style.display = "none";
            div1.style.display = "none";
        }

        f5() {
            if (name1.value.trim() === "") {
                alert("Please enter a type name.");
                return;
            }
            var x = window.localStorage.getItem("types");
            if (x) {
                types = JSON.parse(x);
            }
            types.push(name1.value);
            window.localStorage.setItem("types", JSON.stringify(types));
            name1.value = "";
        }

        f7() {
            let selectx = document.getElementById("select1").value;
            types.splice(Number(selectx), 1);
            window.localStorage.setItem("types", JSON.stringify(types));
            obj.f2();
        }
    }

    class AddEmp {
        addfunc() {
            let selecty = document.getElementById("select2").value;
            if (name2.value.trim() === "" || des.value.trim() === "") {
                alert("Please fill out both fields.");
                return;
            }

            var y = window.localStorage.getItem("emps");
            if (y) {
                emps = JSON.parse(y);
            }

            if (document.getElementById("addadd").innerHTML === "Update") {
                var a = document.getElementById("name2").value;
                emps.splice(jk, 1, {
                    addname: a,
                    adddes: document.getElementById("des").value,
                    addtype: types[selecty],
                });
            } else {
                emps.push({
                    addname: name2.value,
                    adddes: des.value,
                    addtype: types[selecty],
                });
                if (no < 3) no++;
            }

            des.value = "";
            name2.value = "";
            window.localStorage.setItem("emps", JSON.stringify(emps));
        }
    }

    let obj = new Empl();
    let obj1 = new CreateType();
    let obj2 = new AddEmp();

    btn1.onclick = function () { obj.f1(); };
    btn2.onclick = function () { obj.f2(); };
    btn3.onclick = function () { obj.f3(); };
    btn4.onclick = function () { obj.f4(); };

    btn5.onclick = function () { obj1.f5(); };
    btn6.onclick = function () { obj1.f6(); };
    btn7.onclick = function () { obj1.f7(); };
    btn8.onclick = function () { obj1.f6(); };

    addadd.onclick = function () { obj2.addfunc(); };

    addundo.onclick = function () {
        if (no > 0) {
            var x = window.localStorage.getItem("emps");
            if (x) {
                emps = JSON.parse(x);
            }
            emps.splice(0, 1);
            window.localStorage.setItem("emps", JSON.stringify(emps));
            no--;
        } else {
            alert("Can't undo more than 3 items");
        }
    };

    function displaylist(e) {
        eledit.disabled = true;
        elrem.disabled = true;
        var devs = [];
        var x = window.localStorage.getItem("emps");
        if (x) {
            emps = JSON.parse(x);
        }
        for (var i = 0; i < emps.length; i++) {
            if (emps[i].addtype === e.srcElement.getAttribute('id')) {
                devs.push(emps[i].addname);
            }
        }
        document.getElementById("list1").innerHTML = '';
        var listoftypes = "";
        for (var i = 0; i < devs.length; i++) {
            listoftypes += `<li idx=${devs[i]}>${devs[i]}</li><br>`;
        }
        document.getElementById("list1").innerHTML = listoftypes;
    }

    listemp.onclick = function showOnHover(e) {
        displaylist(e);
    };

    list1.onclick = function showOnHover(e) {
        var str = e.srcElement.getAttribute('idx');
        e.srcElement.setAttribute('style', 'background-color:yellow');
        eledit.disabled = false;
        elrem.disabled = false;
        var x = window.localStorage.getItem("emps");
        if (x) {
            emps = JSON.parse(x);
        }
        var obj4 = [];
        for (var i = 0; i < emps.length; i++) {
            if (emps[i].addname === e.srcElement.getAttribute('idx')) {
                obj4[0] = emps[i].addname;
                obj4[1] = emps[i].adddes;
                obj4[2] = emps[i].addtype;
                obj4[3] = i;
            }
        }

        eledit.onclick = function editemp() {
            div4.style.display = "block";
            div3.style.display = "none";
            div2.style.display = "none";
            div1.style.display = "none";
            var x = window.localStorage.getItem("types");
            if (x) {
                types = JSON.parse(x);
            }
            var listoftypes = "";
            for (var i = 0; i < types.length; i++) {
                listoftypes += `<option value=${i}>${types[i]}</option>`;
            }
            document.getElementById("select2").innerHTML = listoftypes;
            document.getElementById("name2").value = obj4[0];
            document.getElementById("des").value = obj4[1];
            jk = obj4[3];
            document.getElementById("addadd").innerHTML = "Update";
        };

        elrem.onclick = function rememp() {
            emps.splice(obj4[3], 1);
            window.localStorage.setItem("emps", JSON.stringify(emps));
            obj.f3();
        };
    };
});
