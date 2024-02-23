import { create } from "zustand";
import { persist } from "zustand/middleware";


const INITIAL_STATE = {
    //başlangıç state leri
    products: [],
    totalItems: 0,
    totalPrice: 0,
  };
  //burdakı persist i sonradan ekledsik,sayfa yenılenince cart dakkı adetler gitmsin die,
  //saedec bunu yapınca hydration error verıor onun içinde persist ın objesine skiphydration true ekledik.
  export const useCartStore = create(
    persist(
      (set, get) => ({
        products: INITIAL_STATE.products,
        totalItems: INITIAL_STATE.totalItems,
        totalPrice: INITIAL_STATE.totalPrice,
  
        //aşağodakı ıkısı de action lar
  
        addToCart(item) {
          const products = get().products;
          const productInState = products.find(
            (product) => product.id === item.id && product.optionTitle===item.optionTitle
          );
  
          if (productInState) {
            const updatedProducts = products.map((product) =>
              product.id === productInState.id && product.optionTitle===item.optionTitle
                ? {
                    ...item,
                    quantity: item.quantity + product.quantity,
                    price: item.price + product.price,
                  }
                : item
            );
            set((state) => ({
              products: updatedProducts,
              totalItems: state.totalItems + item.quantity,
              totalPrice: state.totalPrice + item.price,
            }));
          } else {
            set((state) => ({
              products: [...state.products, item],
              totalItems: state.totalItems + item.quantity,
              totalPrice: state.totalPrice + item.price,
            }));
          }
        },
        removeFromCart(item) {
          set((state) => ({
            products: state.products.filter((product) => product.id !== item.id || product.optionTitle !== item.optionTitle),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
          }));
        },
        //bunu ben yazdım sadece reset lazım oluor die,ui de kullanılmayacak
        //DÜZELTME::checkout sonrası reset için kullanıyporum
        resetCart() {
          set(() => ({
            products: [],
            totalItems: 0,
            totalPrice: 0,
          }));
          useCartStore.persist.rehydrate();
        }
      }),
      { name: "cart", skipHydration: true }
    )
  );

  /* register -sign in form open close states */
  
  export  const useFormStore = create((set) => ({
    signInFormOpen: false,
    openSignInForm: () => set({ signInFormOpen: true }),
    closeSignInForm: () => set({ signInFormOpen: false }),
  }));


    /* edit modal open-close*/
  
    export  const useEditModalStore = create((set) => ({
     editFormOpen: false,
      openEditForm: () => set({ editFormOpen: true }),
      closeEditForm: () => set({ editFormOpen: false }),
    }));