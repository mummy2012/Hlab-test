import { Injectable } from '@nestjs/common'
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {

	constructor(       
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {
	}

	async create():Promise<Product> {
        try{
            const newProduct = this.productRepository.create({});
            return await this.productRepository.save(newProduct);
        }catch(e){
            console.log(e?.message);
        }
    }

    async findByID(id:string):Promise<Product | undefined> {
        try {
            return await this.productRepository.findOneBy({id:id});
        } catch(e) {
            console.log(e?.message);
            throw e;
        }
    }

}