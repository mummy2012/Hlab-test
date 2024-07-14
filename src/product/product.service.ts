import { Injectable } from '@nestjs/common'
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid'; 


@Injectable()
export class ProductService {

	constructor(       
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {
	}

	async create():Promise<Product> {
        try{
            console.log('1');
            
            const newProduct = this.productRepository.create();
            // Optionally, generate UUID if needed:
            newProduct.id = uuidv4();
            console.log('2');
            
            const savedProduct = await this.productRepository.save(newProduct);
            console.log('3');
            return savedProduct;
            
        }catch(e){
            throw new Error('Save failed');         
        }
    }

    async findByID(id:string):Promise<Product | undefined> {
        try {
            return await this.productRepository.findOneBy({id:id});
        } catch(e) {
            throw new Error('Find failed');
        }
    }

}