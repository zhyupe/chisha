(function () {
  function $ (id) {
    return document.getElementById(id)
  }

  var $title = $('title')
  var $what = $('what')
  var $button = $('button')
  var running = 0
  var timer
  var times = 0
  var list = []

  function handleResponse (content) {
    console.log(content)
    content.split('\n').forEach(function (item) {
      item = item.trim()
      if (!item || item[0] === '#') return

      list.push(item)
    })

    $button.textContent = '开始'
    $button.addEventListener('click', run)
  }

  function load () {
    if (window.fetch) {
      fetch('dishes.txt').then(function (res) { return res.text() }).then(handleResponse)
    } else {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', '/article/xmlhttprequest/example/load')
      xhr.onload = function () {
        handleResponse(xhr.responseText)
      }
      xhr.send()
    }
  }

  load()

  function run () {
    if (running) {
      $title.textContent = '吃这个！'
      $button.textContent = '不行，换一个'
      clearInterval(timer)
      running = false
    } else {
      if (times > 5) {
        alert('这么挑？别吃了！')
        return
      }

      ++times

      $title.textContent = '吃啥？'
      $button.textContent = '停止'
      timer = setInterval(function () {
        var r = Math.floor(Math.random() * list.length)
        var food = list[r - 1]
        $what.textContent = food

        var tag = document.createElement('span')
        tag.className = 'tag'
        tag.textContent = food
        tag.style.top = Math.ceil(Math.random() * document.body.clientHeight) + 'px'
        tag.style.left = Math.ceil(Math.random() * (document.body.clientWidth - 50)) + 'px'
        tag.style.fontSize = Math.ceil(Math.random() * (37 - 14) + 14) + 'px'
        tag.style.color = 'rgba(0, 0, 0, ' + Math.random() + ')'

        document.body.appendChild(tag)
        tag.className += ' fade'
        setTimeout(function () {
          tag.remove()
        }, 1200)
      }, 50)
      running = true
    }
  }

  document.onkeydown = function enter (e) {
    if (e.key === 'enter') run()
  }
})()
