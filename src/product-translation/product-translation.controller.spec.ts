import { Test, TestingModule } from '@nestjs/testing';
import { ProductTranslationController } from './product-translation.controller';
import { ProductTranslationService } from './product-translation.service';
import { SearchProductTranslationDto } from './dto/search-product-translation.dto';

const mockProductTranslationService = () => ({
  search: jest.fn(),
});

describe('ProductTranslationController', () => {
  let controller: ProductTranslationController;
  let service: ProductTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTranslationController],
      providers: [
        {
          provide: ProductTranslationService,
          useFactory: mockProductTranslationService,
        },
      ],
    }).compile();

    controller = module.get<ProductTranslationController>(ProductTranslationController);
    service = module.get<ProductTranslationService>(ProductTranslationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should call the search method from the service', async () => {
      const searchDto: SearchProductTranslationDto = { name: 'sample', page: 1, limit: 10 };
      const mockResult = { data: [{ id: '1', name: 'sample product', language: 'en', productId: '1', description: 'sample description' }], totalItems: 1, totalPages: 1, currentPage: 1 };
      
      (service.search as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.search(searchDto);
      expect(result).toEqual(mockResult);
      expect(service.search).toHaveBeenCalledWith(searchDto);
    });
  });
});
