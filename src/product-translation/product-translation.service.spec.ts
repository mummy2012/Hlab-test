import { Test, TestingModule } from "@nestjs/testing";
import { ProductTranslationService } from "./product-translation.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductTranslation } from "./product-translation.entity";
import { Repository } from "typeorm";
import { UpsertProductTranslateItem } from "./dto/bulk-upsert-product-translation.dto";
import { SearchProductTranslationDto } from "./dto/search-product-translation.dto";

const mockProductTranslationRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([
      [
        {
          id: "1",
          name: "sample product",
          language: "en",
          productId: "1",
          description: "sample description",
        },
      ],
      1,
    ]),
  })),
});

describe("ProductTranslationService", () => {
  let service: ProductTranslationService;
  let repository: Repository<ProductTranslation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductTranslationService,
        {
          provide: getRepositoryToken(ProductTranslation),
          useFactory: mockProductTranslationRepository,
        },
      ],
    }).compile();

    service = module.get<ProductTranslationService>(ProductTranslationService);
    repository = module.get<Repository<ProductTranslation>>(
      getRepositoryToken(ProductTranslation)
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("upsert", () => {
    it("should update existing product translation", async () => {
      const mockProductTranslation = {
        productId: "1",
        language: "en",
        name: "Old Name",
        description: "Old Description",
      };
      const input: UpsertProductTranslateItem = {
        productId: "1",
        language: "en",
        name: "New Name",
        description: "New Description",
      };

      repository.findOne = jest.fn().mockResolvedValue(mockProductTranslation);
      repository.save = jest.fn();

      await service.upsert(input);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { productId: input.productId, language: input.language },
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockProductTranslation,
        name: "New Name",
        description: "New Description",
      });
    });

    it("should create new product translation if not existing", async () => {
      const input: UpsertProductTranslateItem = {
        productId: "2",
        language: "fr",
        name: "New Name",
        description: "New Description",
      };

      repository.findOne = jest.fn().mockResolvedValue(null);
      repository.save = jest.fn();

      await service.upsert(input);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { productId: input.productId, language: input.language },
      });
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          productId: input.productId,
          language: input.language,
          name: input.name,
          description: input.description,
        })
      );
    });
  });

  describe("search", () => {
    it("should return paginated product translations", async () => {
      const searchDto: SearchProductTranslationDto = {
        name: "sample",
        page: 1,
        limit: 10,
      };

      const mockData = [
        {
          id: "1",
          name: "sample product",
          language: "en",
          productId: "1",
          description: "sample description",
        },
      ];

      const result = await service.search(searchDto);

      expect(result).toEqual({
        data: mockData,
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
      });

      expect(repository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
