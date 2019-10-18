    import {
        ADD_GOODS,
        INIT_SHOP_CART
    } from './mutations-type'



    export default {
        [ADD_GOODS](state, {
            goodsId,
            goodsName,
            smallImage,
            goodsPrice
        }) {
            let shopCart=state.shopCart //深拷贝浅拷贝问题
            if(shopCart[goodsId]){
                shopCart[goodsId]['num']++
            }else{
                shopCart[goodsId]={
                    'num':1,
                    'id':goodsId,
                    'name':goodsName,
                    'small_image':smallImage,
                    'price':goodsPrice,
                    'checked':true 
                }
            }
            //产生新对象
            state.shopCart ={...shopCart}
        },
        [INIT_SHOP_CART](){

        }
    }