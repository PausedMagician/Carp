import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Company {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * Company name
             */
            name: string;
            /**
             * Company address
             */
            address: string;
        }
        export interface Employee {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * Employee username
             */
            username: string;
            /**
             * Employee password
             */
            password: string;
            /**
             * Employee email
             */
            email: string;
            /**
             * Employee department
             */
            department: string;
            personal_details: PersonalDetails;
        }
        export interface PersonalDetails {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * First name of the employee
             */
            first_name: string;
            /**
             * Last name of the employee
             */
            last_name: string;
            /**
             * Birthday of the employee
             */
            birthday: string; // date
        }
        export interface Vehicle {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * Vehicle manufacturer
             */
            make: string;
            /**
             * Vehicle model
             */
            model: string;
            /**
             * Vehicle variant
             */
            variant: string;
            /**
             * Vehicle color
             */
            color: string;
            /**
             * Vehicle type
             */
            type: string;
            /**
             * Manufacturing year
             */
            year: number;
        }
    }
}
declare namespace Paths {
    namespace CreateCompany {
        export type RequestBody = Components.Schemas.Company;
        namespace Responses {
            export type $201 = Components.Schemas.Company;
        }
    }
    namespace CreateEmployee {
        export type RequestBody = Components.Schemas.Employee;
        namespace Responses {
            export type $201 = Components.Schemas.Employee;
        }
    }
    namespace DeleteCompany {
        export type RequestBody = Components.Schemas.Company;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteEmployee {
        export type RequestBody = Components.Schemas.Employee;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace Employees {
        namespace Put {
            export type RequestBody = Components.Schemas.Employee;
            namespace Responses {
                export type $200 = Components.Schemas.Employee;
            }
        }
    }
    namespace Employees$Id {
        namespace Get {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            namespace Responses {
                export type $200 = Components.Schemas.Employee;
            }
        }
    }
    namespace GetAllCompanies {
        namespace Responses {
            export type $200 = Components.Schemas.Company[];
        }
    }
    namespace GetAllEmployees {
        namespace Responses {
            export type $200 = Components.Schemas.Employee[];
        }
    }
    namespace GetCompanyById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Company;
        }
    }
    namespace GetVehicleById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Vehicle;
        }
    }
    namespace GetVehicles {
        namespace Responses {
            export type $200 = Components.Schemas.Vehicle[];
        }
    }
    namespace UpdateCompany {
        export type RequestBody = Components.Schemas.Company;
        namespace Responses {
            export type $200 = Components.Schemas.Company;
        }
    }
    namespace Vehicles {
        namespace Delete {
            export type RequestBody = Components.Schemas.Vehicle;
            namespace Responses {
                export interface $200 {
                }
            }
        }
        namespace Post {
            export type RequestBody = Components.Schemas.Vehicle;
            namespace Responses {
                export type $201 = Components.Schemas.Vehicle;
            }
        }
        namespace Put {
            export type RequestBody = Components.Schemas.Vehicle;
            namespace Responses {
                export type $200 = Components.Schemas.Vehicle;
            }
        }
    }
}


export interface OperationMethods {
  /**
   * getAllCompanies - Get all companies
   */
  'getAllCompanies'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllCompanies.Responses.$200>
  /**
   * updateCompany - Update a company
   */
  'updateCompany'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateCompany.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateCompany.Responses.$200>
  /**
   * createCompany - Create a new company
   */
  'createCompany'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateCompany.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateCompany.Responses.$201>
  /**
   * deleteCompany - Delete a company
   */
  'deleteCompany'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteCompany.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteCompany.Responses.$200>
  /**
   * getCompanyById - Get company by ID
   */
  'getCompanyById'(
    parameters?: Parameters<Paths.GetCompanyById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCompanyById.Responses.$200>
  /**
   * getAllEmployees - Get all employees
   */
  'getAllEmployees'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllEmployees.Responses.$200>
  /**
   * createEmployee - Create a new employee
   */
  'createEmployee'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateEmployee.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateEmployee.Responses.$201>
  /**
   * deleteEmployee - Delete an employee
   */
  'deleteEmployee'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteEmployee.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEmployee.Responses.$200>
  /**
   * getVehicles - Get all vehicles
   */
  'getVehicles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetVehicles.Responses.$200>
  /**
   * getVehicleById - Get vehicle by ID
   */
  'getVehicleById'(
    parameters?: Parameters<Paths.GetVehicleById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetVehicleById.Responses.$200>
}

export interface PathsDictionary {
  ['/companies']: {
    /**
     * createCompany - Create a new company
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateCompany.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateCompany.Responses.$201>
    /**
     * getAllCompanies - Get all companies
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllCompanies.Responses.$200>
    /**
     * updateCompany - Update a company
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateCompany.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateCompany.Responses.$200>
    /**
     * deleteCompany - Delete a company
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteCompany.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteCompany.Responses.$200>
  }
  ['/companies/{id}']: {
    /**
     * getCompanyById - Get company by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetCompanyById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCompanyById.Responses.$200>
  }
  ['/employees']: {
    /**
     * createEmployee - Create a new employee
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateEmployee.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateEmployee.Responses.$201>
    /**
     * getAllEmployees - Get all employees
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllEmployees.Responses.$200>
    /**
     * deleteEmployee - Delete an employee
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteEmployee.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEmployee.Responses.$200>
  }
  ['/employees/{id}']: {
  }
  ['/vehicles']: {
    /**
     * getVehicles - Get all vehicles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetVehicles.Responses.$200>
  }
  ['/vehicles/{id}']: {
    /**
     * getVehicleById - Get vehicle by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetVehicleById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetVehicleById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Company = Components.Schemas.Company;
export type Employee = Components.Schemas.Employee;
export type PersonalDetails = Components.Schemas.PersonalDetails;
export type Vehicle = Components.Schemas.Vehicle;
