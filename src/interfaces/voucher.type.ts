export interface IVoucherDocs {
  data: {
    docs: IVoucher[];
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    limit?: number;
    nextPage?: null | any;
    page?: number;
    pagingCounter?: number;
    prevPage?: null | any;
    totalDocs?: number;
    totalPages?: number;
  };
}

export interface IVoucher {
  _id?: string;
  code: string;
  discount: number;
  sale: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
