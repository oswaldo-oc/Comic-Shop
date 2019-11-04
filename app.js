class User {
    constructor () {
        
    }

    static getKey(){
        return 'username'
    }

    static save(user){
        localStorage.setItem(User.getKey(), user)
    }

    static get(){
        return localStorage.getItem(User.getKey())
    }

    static remove(){
        localStorage.removeItem(User.getKey())
    }
}

const showUsername = function(){
    const username = User.get()
    const inputUser = document.querySelector('.username')
    const logoutOpt = document.querySelector('#logout')
    if(username != '' && username != null){
        inputUser.innerHTML = ''
        inputUser.innerHTML = username + ' <i class="fas fa-user"></i>'
        logoutOpt.style.display = 'block'
        inputUser.href = '#'
    }else{
        inputUser.innerHTML = 'Iniciar Sesión <i class="fas fa-sign-in-alt"></i></i>'
        inputUser.href = 'login.html'
    }
}
const logOut = function(){
    const logoutOpt = document.querySelector('#logout')
    localStorage.clear()
    logoutOpt.style.display = 'none'
    window.location.href = 'index.html'
}
const init = function(){
    document.querySelector('.logout').addEventListener('click', logOut)
    showUsername()
}
const loadLogin = function (){
    const btnLogin = document.querySelector('#btnLogin')
    btnLogin.addEventListener('click', function(){
        if(document.querySelector('#username').value != '' && document.querySelector('#pw').value != ''){
            User.save(document.querySelector('#username').value)
            window.location.href = 'index.html'
        }else{
            alert('Ingrese nombre de usuario y contraseña')
        }
    })
}

const getProduct = function(index){
    const products = [
        {
          imgUrl: "https://imgix.ranker.com/user_node_img/50029/1000567791/original/the-incredible-hulk-1-photo-u2?w=650&q=50&fm=pjpg&fit=crop&crop=faces",
          name: "Incredible Hulk #1",
          price: 200
        },
        {
          imgUrl: "https://imgix.ranker.com/user_node_img/50029/1000567667/original/amazing-spider-man-50-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces",
          name: "Amazing Spider-Man #50",
          price: 250
        },
        {
          imgUrl: "https://imgix.ranker.com/user_node_img/50029/1000568954/original/flash-123-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces",
          name: "Flash #123",
          price: 220
        },
        {
          imgUrl: "https://imgix.ranker.com/user_node_img/50029/1000567666/original/amazing-spider-man-39-photo-u1?w=650&q=60&fm=pjpg&fit=crop&crop=faces%22",
          name: "Amazing Spider-Man #39",
          price: 500
        },
        {
          imgUrl: "https://imgix.ranker.com/user_node_img/50029/1000568042/original/uncanny-x-men-1-photo-u1?w=650&q=60&fm=pjpg&fit=crop&crop=faces%22",
          name: "Uncanny X-Men #1",
          price: 180
        },
        {
          imgUrl: "https://imgix.ranker.com/user_node_img/50029/1000567699/original/captain-america-109-photo-u1?w=650&q=60&fm=pjpg&fit=crop&crop=faces%22",
          name:"Captain America #109",
          price: 300
        },
        {
          imgUrl:"https://imgix.ranker.com/user_node_img/50029/1000567664/original/amazing-spider-man-33-photo-u1?w=650&q=60&fm=pjpg&fit=crop&crop=faces%22",
          name:"Amazing Spider-Man #33",
          price: 280
        },
        {
          imgUrl:"https://imgix.ranker.com/user_node_img/50029/1000568297/original/batman-156-photo-u1?w=650&q=60&fm=pjpg&fit=crop&crop=faces%22",
          name:"Batman #156",
          price: 350
        },
        {
          imgUrl:"https://imgix.ranker.com/user_node_img/50029/1000567681/original/iron-man-1-photo-u1?w=650&q=60&fm=pjpg&fit=crop&crop=faces%22",
          name:"Iron Man #1",
          price: 400
        }
      ]
      return products[index]
}

const createImg = function(url) {
	const productImg = document.createElement('img')
	productImg.src = url
	productImg.classList.add('image')
	return productImg
}
const createName = function (name) {
	const productName = document.createElement('h2')
	const text = document.createTextNode(name)
	productName.appendChild(text)
	productName.classList.add('name')
	return productName
}
const createPrice = function(price){
    const productPrice = document.createElement('h2')
    const text = document.createTextNode('$'+price)
    productPrice.appendChild(text)
    productPrice.classList.add('price')
    return productPrice
}

const renderProduct = function(product, screen) {
  const screen1 = document.querySelector(screen)
  const screen2 = document.createElement('div')
  screen1.appendChild(screen2)
  screen2.classList.add('product-container')
  screen2.appendChild(createImg(product.imgUrl))
  screen2.appendChild(createName(product.name))
  screen2.appendChild(createPrice(product.price))
  screen2.appendChild(createBtn(product))
}

const createBtn = function(product){
  const btnAddCar = document.createElement('button')
  btnAddCar.classList.add('btnAdd')
  btnAddCar.innerHTML = 'Agregar '+'<i class="fas fa-cart-plus"></i>'
  btnAddCar.addEventListener('click', function(){
    var arrayProducts = [] 
    var lista = JSON.parse(localStorage.getItem('products'))
    if(lista == null){
      arrayProducts[0] = product
    }else{
      arrayProducts = lista
      arrayProducts[lista.length] = product
    }
    localStorage.setItem('products', JSON.stringify(arrayProducts))
    alert(product.name + ' añadido al carrito.')
  })
  return btnAddCar
}

const initProducts = function(cantidad, screen){
    for(let i=0; i<cantidad; i++){
        renderProduct(getProduct(i), screen)
    }
}

const initCart = function(){
  var products = JSON.parse(localStorage.getItem('products'))
  const added = document.querySelector('.product-added')
  const price = document.querySelector('.total-price')
  const btnPay = document.querySelector('.pagar')
  var precio = 0
  if(products!=null){
    for(let i=0; i<products.length; i++){
      const container = document.createElement('div')
      container.classList.add('container-imgcart')
      const cont1 = document.createElement('div')
      cont1.classList.add('container-info')
      container.appendChild(createImg(products[i].imgUrl))
      cont1.appendChild(createName(products[i].name))
      cont1.appendChild(createPrice(products[i].price))
      added.appendChild(container)
      container.appendChild(cont1)
      precio+= products[i].price
    }
    const pr = document.createTextNode('Total: $'+precio)
    price.appendChild(pr)
  }else{
    const noHay = document.createElement('h1')
    noHay.classList.add('no-products')
    noHay.appendChild(document.createTextNode('No hay productos en el carrito.'))
    added.appendChild(noHay)
  }
  btnPay.addEventListener('click', function(){
    if(products!=null){
      if(localStorage.getItem('username')!=null){
        localStorage.removeItem('products')
        alert('Tu compra se ha realizado con éxito.')
        window.location.href = 'index.html'
      }else{
        alert('Inicio de sesión no detectado.')
        window.location.href = 'login.html'
      }
    }else{
      alert('No hay productos en el carrito.')
    }
  })
}

$(document).ready(function(){
  if($("body").height() < $(window).height()){
    $("footer").css({"position":"absolute", "bottom":"0px"})
  }
})