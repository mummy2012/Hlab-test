import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SearchProductTranslationDto {
    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsInt()
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number

    @IsInt()
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number
}
