export interface Product {
    'id': number,
    'title': string,
    'price': number,
    'description': string,
    'image': string,
    'rating': {
        'rate': number,
        'count': number
    }
}

export interface CartSummary {
    total: number,
    qty: number
}

export interface FormCheckout {
    name: string,
    phone: string
}

export interface OrderProduct extends Product {
    qty: number,
    user: FormCheckout
}

export interface OrderState {
    id: string,
    date: string,
    total: number,
    products: OrderProduct[];
}