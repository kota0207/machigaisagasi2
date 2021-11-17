const APPLICATION_KEY = "85a98c8eae79a7e2778803c93786feefb4fb3db3b523f3bbe0afe2c7407c0a99";
const CLIENT_KEY = "7103c6aaf3930795a99877b686dae2c848db84b27354f01fbd991ac82bcffd60";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";

let TestClass = ncmb.DataStore(DBName);

function save(time){
  let test = new TestClass();
  let key = "score";

  let value = time-1;
  test.set(key, parseInt(value));
  test.save()
  .then(function(){
    console.log("成功");
  })
  .catch(function(err){
    console.log("エラー発生: " + err);
  });
}

function load(){
  TestClass
  .order("score")
  .fetchAll()
  .then(function(results){
    for (let i=0; i<results.length; i++){
      console.log(results[i].score);
      console.log(timer);
      }
      if(results[0].score > timer){
        alert("High scoer!" + timer);
    }
  })
  .catch(function(err){
    console.log("エラー発生: " + err);
  });
}

let timer = null;
let count = 0;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for(let i=0; i<size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num"+i);
    s.addEventListener("click", function(){
      if(this.textContent== q[qNum][1]){
        correct .play();
        count++;
        if(count == MAX){
          clearTimeout(timer);
          save(timer);
          load(timer);
        } else {
          while(cells.firstChild){
            cells.removeChild(cells.firstChild);
          }
          gameStart();
        }
      }else{
        wrong.play();
      }
    });



    cells.appendChild(s);
    if(i % size == size -1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() -
                            start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}
