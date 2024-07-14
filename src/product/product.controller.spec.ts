import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductTranslationService } from '../product-translation/product-translation.service';
import { CreateProductDto } from './dto/create-product.dto';


describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;
  let productTranslationService: ProductTranslationService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn(() => ({ id: 'generated-id' })),
          },
        },
        {
          provide: ProductTranslationService,
          useValue: {
            upsert: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    productTranslationService = module.get<ProductTranslationService>(ProductTranslationService);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create product and upsert translations', async () => {
      const createDto: CreateProductDto = {
        productTranslateItems: [
          { language: 'en', name: 'English Name', description: 'English Description' },
          { language: 'fr', name: 'French Name', description: 'French Description' },
        ],
      };

      await controller.createProduct(createDto);

      expect(productService.create).toHaveBeenCalled();
      expect(productTranslationService.upsert).toHaveBeenCalledTimes(2);
    });

    it('should create product and handle no translations', async () => {
      const createDto: CreateProductDto = {
        productTranslateItems: [],
      };

      await controller.createProduct(createDto);

      expect(productService.create).toHaveBeenCalled();
      expect(productTranslationService.upsert).not.toHaveBeenCalled();
    });

    it('should handle error', async () => {
      jest.spyOn(productService, 'create').mockRejectedValueOnce(new Error('Product creation failed'));

      const createDto: CreateProductDto = {
        id: 'provided-id',
        productTranslateItems: [
          { language: 'en', name: 'English Name', description: 'English Description' },
        ],
      };

      const result = await controller.createProduct(createDto);

      expect(result).toEqual(undefined);
    });
  });
});
