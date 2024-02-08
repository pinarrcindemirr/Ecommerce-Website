const data = {
    Electronics: {
      image: '/pictures/tech.jpeg',
      products: [
        { id: 1, name: 'Laptop', price: 999, category:'Electronics', image:'/pictures/laptop.jpeg' },
        { id: 2, name: 'MobilePhone', price: 499 , category:'Electronics' , image:'' }
      ]
    },
    BabyToys: {
      image: '/pictures/baby.jpeg',
      products: [
        { id: 3, name: 'Teddy Bear', price: 29, category:'Baby Toys'  ,imageURL:'' },
        { id: 4, name: 'Lego Set', price: 59 , category:'Baby Toys' , imageURL:'' }
      ]
    },
    Fashion: {
      image: '/pictures/images.png',
      products: [
        { id: 5, name: 'Jeans', price: 39, category:'Fashion' , imageURL:'' },
        { id: 6, name: 'T-Shirt', price: 19 , category:'Fashion', imageURL:''  }
      ]
    },
    Food: {
      image: '/pictures/food.jpeg',
      products: [
        { id: 7, name: 'Organic Honey', price: 15 , category:'Food' , imageURL:''},
        { id: 8, name: 'Olive Oil', price: 10 , category:'Food'}
      ]
    },
    Cloths: {
      image: '/pictures/clothes.jpeg',
      products : [
        { id: 9, name: 'Jacket', price: 49 , category:'Cloths', imageURL:'' },
        { id: 10, name: 'Scarf', price: 25 , category:'Cloths', imageURL:'' }
      ]
    },
    GameAssesories: {
      image: '/pictures/games.jpeg',
      products: [
        { id: 11, name: 'Gaming Mouse', price: 59 , category:'Game Assesories',imageURL:'' },
        { id: 12, name: 'Keyboard', price: 89 , category:'Game Assesories', imageURL:'' }
      ]
    },
    HealthBeauty: {
      image: '/pictures/beauty.jpeg',
      products : [
        { id: 13, name: 'Shampoo', price: 8 , imageURL:''},
        { id: 14, name: 'Skin Cream', price: 22 , imageURL:'' }
      ]
    }
  };

  export const getCategories = () => {
    return Object.keys(data);
  };
  
  export const getCategoryProducts = (categoryName) => {
    return data[categoryName]?.products || [];
  };
  
  export default data;