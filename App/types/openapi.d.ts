import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Booking {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * Purpose of the booking
             */
            purpose: string;
            /**
             * Status of the booking
             */
            booking_status: string;
            /**
             * Destination of the booking
             */
            destination: string;
            /**
             * Start date of the booking
             */
            start_date: string; // date-time
            /**
             * End date of the booking
             */
            end_date: string; // date-time
            /**
             * Employee associated with the booking
             */
            employee?: {
                [key: string]: any;
            };
            /**
             * Vehicle associated with the booking
             */
            vehicle?: {
                [key: string]: any;
            };
            /**
             * Log entries associated with the booking
             */
            logEntries?: {
                [key: string]: any;
            }[];
        }
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
        export interface Log {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * Starting location
             */
            from_location: string;
            /**
             * Destination location
             */
            to_location: string;
            /**
             * Start date and time
             */
            start_date: string; // date-time
            /**
             * End date and time
             */
            end_date: string; // date-time
            /**
             * Odometer reading at start
             */
            start_odometer: number; // float
            /**
             * Odometer reading at end
             */
            end_odometer: number; // float
            employee?: Employee;
            booking?: Booking;
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
    namespace CreateBooking {
        export type RequestBody = Components.Schemas.Booking;
        namespace Responses {
            export type $201 = Components.Schemas.Booking;
        }
    }
    namespace CreateEmployee {
        export type RequestBody = Components.Schemas.Employee;
        namespace Responses {
            export type $201 = Components.Schemas.Employee;
        }
    }
    namespace CreateLog {
        export type RequestBody = Components.Schemas.Log;
        namespace Responses {
            export type $201 = Components.Schemas.Log;
        }
    }
    namespace CreateVehicle {
        export type RequestBody = Components.Schemas.Vehicle;
        namespace Responses {
            export type $201 = Components.Schemas.Vehicle;
        }
    }
    namespace DeleteBooking {
        export interface BodyParameters {
            booking: Parameters.Booking;
        }
        namespace Parameters {
            export type Booking = Components.Schemas.Booking;
        }
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
    namespace DeleteLog {
        export type RequestBody = Components.Schemas.Log;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteVehicle {
        export type RequestBody = Components.Schemas.Vehicle;
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
    namespace GetAllBookings {
        namespace Responses {
            export type $200 = Components.Schemas.Booking[];
        }
    }
    namespace GetAllEmployees {
        namespace Responses {
            export type $200 = Components.Schemas.Employee[];
        }
    }
    namespace GetAllLogs {
        namespace Responses {
            export type $200 = Components.Schemas.Log[];
        }
    }
    namespace GetAvailableVehicles {
        namespace Responses {
            export type $200 = Components.Schemas.Vehicle[];
        }
    }
    namespace GetBookingById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Booking;
        }
    }
    namespace GetLogById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Log;
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
    namespace UpdateBooking {
        export type RequestBody = Components.Schemas.Booking;
        namespace Responses {
            export type $200 = Components.Schemas.Booking;
        }
    }
    namespace UpdateLog {
        export type RequestBody = Components.Schemas.Log;
        namespace Responses {
            export type $200 = Components.Schemas.Log;
        }
    }
    namespace UpdateVehicle {
        export type RequestBody = Components.Schemas.Vehicle;
        namespace Responses {
            export type $200 = Components.Schemas.Vehicle;
        }
    }
}


export interface OperationMethods {
  /**
   * getAllBookings - Get all bookings
   */
  'getAllBookings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllBookings.Responses.$200>
  /**
   * updateBooking - Update an existing booking
   */
  'updateBooking'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateBooking.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBooking.Responses.$200>
  /**
   * createBooking - Create a new booking
   */
  'createBooking'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBooking.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBooking.Responses.$201>
  /**
   * deleteBooking - Delete a booking
   */
  'deleteBooking'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBooking.Responses.$200>
  /**
   * getBookingById - Get booking by ID
   */
  'getBookingById'(
    parameters?: Parameters<Paths.GetBookingById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBookingById.Responses.$200>
  /**
   * getAllLogs - Get all companies
   */
  'getAllLogs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllLogs.Responses.$200>
  /**
   * updateLog - Update a log
   */
  'updateLog'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateLog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateLog.Responses.$200>
  /**
   * createLog - Create a new log
   */
  'createLog'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateLog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateLog.Responses.$201>
  /**
   * deleteLog - Delete a log
   */
  'deleteLog'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteLog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteLog.Responses.$200>
  /**
   * getLogById - Get log by ID
   */
  'getLogById'(
    parameters?: Parameters<Paths.GetLogById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLogById.Responses.$200>
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
   * updateVehicle - Update a vehicle
   */
  'updateVehicle'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateVehicle.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateVehicle.Responses.$200>
  /**
   * createVehicle - Create a new vehicle
   */
  'createVehicle'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateVehicle.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateVehicle.Responses.$201>
  /**
   * deleteVehicle - Delete a vehicle
   */
  'deleteVehicle'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteVehicle.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteVehicle.Responses.$200>
  /**
   * getVehicleById - Get vehicle by ID
   */
  'getVehicleById'(
    parameters?: Parameters<Paths.GetVehicleById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetVehicleById.Responses.$200>
  /**
   * getAvailableVehicles - Get all available vehicles
   */
  'getAvailableVehicles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAvailableVehicles.Responses.$200>
}

export interface PathsDictionary {
  ['/bookings']: {
    /**
     * createBooking - Create a new booking
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBooking.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBooking.Responses.$201>
    /**
     * getAllBookings - Get all bookings
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllBookings.Responses.$200>
    /**
     * updateBooking - Update an existing booking
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateBooking.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBooking.Responses.$200>
    /**
     * deleteBooking - Delete a booking
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBooking.Responses.$200>
  }
  ['/bookings/{id}']: {
    /**
     * getBookingById - Get booking by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetBookingById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBookingById.Responses.$200>
  }
  ['/companies']: {
    /**
     * createLog - Create a new log
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateLog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateLog.Responses.$201>
    /**
     * getAllLogs - Get all companies
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllLogs.Responses.$200>
    /**
     * updateLog - Update a log
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateLog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateLog.Responses.$200>
    /**
     * deleteLog - Delete a log
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteLog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteLog.Responses.$200>
  }
  ['/companies/{id}']: {
    /**
     * getLogById - Get log by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetLogById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLogById.Responses.$200>
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
     * createVehicle - Create a new vehicle
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateVehicle.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateVehicle.Responses.$201>
    /**
     * getVehicles - Get all vehicles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetVehicles.Responses.$200>
    /**
     * updateVehicle - Update a vehicle
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateVehicle.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateVehicle.Responses.$200>
    /**
     * deleteVehicle - Delete a vehicle
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteVehicle.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteVehicle.Responses.$200>
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
  ['/vehicles-available']: {
    /**
     * getAvailableVehicles - Get all available vehicles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAvailableVehicles.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Booking = Components.Schemas.Booking;
export type Company = Components.Schemas.Company;
export type Employee = Components.Schemas.Employee;
export type Log = Components.Schemas.Log;
export type PersonalDetails = Components.Schemas.PersonalDetails;
export type Vehicle = Components.Schemas.Vehicle;
