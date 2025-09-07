const categoryContainer = document.getElementById('category-container')
const leftContainer = document.getElementById('left-button');
const cartContainer = document.getElementById('cartContainer');
const cartFather = document.getElementById('cartFather');
let cart = [];
let allPlants =[]

cartFather.addEventListener('click',(e)=>{
    if(e.target.innerText=='Add to Cart'){

         handleCart(e)
    }
    
   
 
})


const handleLeftButton = ()=>{

}
const handleCart=(e)=>{
       
        const title=e.target.parentNode.children[1].innerText;
        const prices = e.target.parentNode.querySelector('.price-money').innerText;
        const price = parseFloat(prices.replace('$', ''));
        const id = e.target.parentNode.id;
        const exist = cart.find(cards=>cards.id==id);
        if(exist){
            alert(`${title} is already in the cart`)
           
        }
        else{
             cart.push({
            title:title,
            id:id,
            price:price
        });
         alert(`${title} has been added to the cart`)

        }

       
        showCart(cart)
    
    
    
}
const showCart = (cart)=>{
    cartContainer.innerHTML="";
    cart.forEach(ct=>{
       
        cartContainer.innerHTML+=`
        <div class="flex items-center justify-between p-2">
        <div><h2>${ct.title}</h2>
        <p>${ct.price}</p></div>
        <div><button onClick="deleteCart(${ct.id})" id="dlt-button">❌</button></div>
        </div>
        `
        

        
    });
       const total = cart.reduce((sum,item)=>sum+item.price,0);
    cartContainer.innerHTML+=`<div>
                                  <span>Total:</span>
                                  <span class="text-green-400">${total.toFixed(2)}</span>
                                  <div>
    `

};
// const showTotal=()=>{
 
// }
const deleteCart =(id)=>{
   cart = cart.filter(ct=>ct.id!==id.toString())
   showCart(cart)
 
   

}


const url = ('https://openapi.programming-hero.com/api/plants')
fetch(url)
.then(res=>res.json())
.then(data=>{
    displayTree(data.plants)

})

const displayTree=(treeArray)=>{
    categoryContainer.innerHTML="";
treeArray.forEach(tr=>{
    console.log(tr)
    categoryContainer.innerHTML+=`        
               
<div id="${tr.id}" class="border-2 border-gray-500 rounded-xl p-3  shadow-sm ">
               <img class="rounded-lg  w-full h-40 object-cover" src="${tr.image}" alt="">
                <h1 class="font-bold text-2xl">${tr.category}</h1>
                <p class="text-xl text-justify">${tr.description}</p>
                <div class="flex justify-between items-center"> 
                    <button class="rounded-full p-2 border-2 border-gray-200  mt-3 bg-white text-[#15803D]">${tr.name}</button>
                    <p class="price-money text-xl font-bold  text-[#15803D] ">$${tr.price}</p>
                </div>
                <button id="" class="cart-button bg-[#15803D] rounded-full p-3 text-center w-full mt-5">Add to Cart</button>
                </div>
            
           
            
              
            `
})



}
const buttonLeft = async()=>{
    try{
        const  res = await fetch('https://openapi.programming-hero.com/api/categories')
        const data = await res.json()
        displayButton(data.categories)
    }
    catch(error){
       console.log('error fetching') 

    }
    
}
const displayButton=(button)=>{
    leftContainer.innerHTML="";
    button.forEach(bt=>{
        console.log(bt)
        
        leftContainer.innerHTML+=`
          <button class="category-btn btn btn-soft btn-primary w-full">${bt.category_name}</button>
          `

    });
    leftContainer.addEventListener('click',(e)=>{
        const allButton =leftContainer.querySelectorAll('button');
        allButton.forEach(allbtn=>{
            allbtn.classList.remove('btn-secondary')
        })
        
        if(e.target.tagName==='BUTTON'){
            e.target.classList.add('btn-secondary')
            

        }
      
   
})


}

const rightDIv=()=>{
 document.querySelectorAll('.cart-button').addEventListener('click',(e)=>{
   const btn = e.target.closest('.category-btn');
   console.log(btn)
 });

}

buttonLeft()