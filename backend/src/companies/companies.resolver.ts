import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/input/create-company.input';

@Resolver(() => Company)
export class CompaniesResolver {
  
  
  constructor(
  
    private readonly companiesService: CompaniesService
  
    ) {}

  @Mutation(() => Company)
  async createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) : Promise<Company> {
    return this.companiesService.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'companies' })
  async findAll() : Promise<Company[]> {
    return this.companiesService.findAll();
  }

  // @Query(() => Company, { name: 'company' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.companiesService.findOne(id);
  // }

  // @Mutation(() => Company)
  // updateCompany(@Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
  //   return this.companiesService.update(updateCompanyInput.id, updateCompanyInput);
  // }

  // @Mutation(() => Company)
  // removeCompany(@Args('id', { type: () => Int }) id: number) {
  //   return this.companiesService.remove(id);
  // }
}
