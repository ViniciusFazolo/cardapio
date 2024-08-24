export interface Option {
    id?: string;
    option: string;
}

export interface ProductOption {
    id?: string;
    description: string;
    required: boolean;
    qtOptionsSelected: number;
    productOptions: Option[];
}
