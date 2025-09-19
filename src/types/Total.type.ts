export interface Total {
    results:  number;
    metadata: Metadata;
    data:     TotalData[];
}

export interface TotalData {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
    nextPage:      number;
}
