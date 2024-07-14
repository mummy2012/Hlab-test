import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid'; 



describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      jest.spyOn(repository, 'create').mockReturnValue({ id: 'generated-id' } as any);
      jest.spyOn(repository, 'save').mockResolvedValueOnce({ id: 'generated-id' } as any);
  
      const result = await service.create();
  
      expect(result).toBeDefined();
      expect(result.id).toBe('generated-id');
      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
    });

    it('should handle create error', async () => {
      jest.spyOn(repository, 'create').mockReturnValue({} as any);
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error('Save failed'));

      await expect(service.create()).rejects.toThrowError('Save failed');
    });
  });

  describe('findByID', () => {
    it('should find a product by ID', async () => {
      jest.spyOn(repository, 'create').mockReturnValue({ id: 'generated-id' } as any);
      jest.spyOn(repository, 'save').mockResolvedValueOnce({ id: 'generated-id' } as any);
  
      const result = await service.create();
    
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result as any);

      const foundProduct = await service.findByID('generated-id');
    
      expect(foundProduct).toBeDefined();
      expect(foundProduct.id).toEqual('generated-id');
      expect(repository.findOneBy).toHaveBeenCalledWith({"id": "generated-id"});
    });

    it('should handle not found', async () => {
      jest.spyOn(repository, 'create').mockReturnValue({ id: 'generated-id' } as any);
      jest.spyOn(repository, 'save').mockResolvedValueOnce({ id: 'generated-id' } as any);
  
      await service.create();

      await expect(service.findByID('1')).rejects.toThrowError('Find failed');

    });

    it('should handle find error', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error('Find failed'));

      await expect(service.findByID('1')).rejects.toThrowError('Find failed');
    });
  });
});
