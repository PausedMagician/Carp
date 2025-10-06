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
            start_date: string; // date
            /**
             * End date of the booking
             */
            end_date: string; // date
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
            /**
             * Is the employee an admin
             */
            isAdmin?: boolean;
            personal_details: PersonalDetails;
        }
        /**
         * example:
         * {
         *   "id": 1,
         *   "from_location": "123 Main St",
         *   "to_location": "456 Elm St",
         *   "start_date": "2023-10-01T08:00:00Z",
         *   "end_date": "2023-10-01T09:00:00Z",
         *   "start_odometer": 1000.5,
         *   "end_odometer": 1025.7,
         *   "employeeId": 1,
         *   "bookingId": 1
         * }
         */
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
            /**
             * Employee ID
             */
            employeeId: number;
            /**
             * Employee ID
             */
            employee?: number;
            /**
             * Booking ID
             */
            bookingId: number;
            /**
             * Booking ID
             */
            booking?: number;
        }
        export interface Maintenance {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * Reason for maintenance
             */
            reason: string;
            /**
             * Status of the maintenance
             */
            status: string;
            /**
             * Log details of the maintenance
             */
            log: string;
            /**
             * Planned date for the maintenance
             */
            planned_at: string; // date-time
            /**
             * Date for which the maintenance is planned
             */
            planned_for: string; // date
            /**
             * Date when the maintenance was completed
             */
            done_at?: string; // date-time
            vehicle?: any;
            reportee?: any;
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
            registration?: VehicleRegistration;
            spec?: VehicleSpec;
        }
        export interface VehicleRegistration {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * License plate of the vehicle
             */
            license: string;
            /**
             * Serial number of the vehicle
             */
            serial: string;
        }
        export interface VehicleSpec {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * Horse power
             */
            horse_power: number; // float
            /**
             * Top speed of the vehicle
             */
            top_speed: number; // float
            /**
             * The mileage in km/l
             */
            mileage: number; // float
            /**
             * If the vehicle has a trailer hitch
             */
            trailer_hitch: boolean;
            /**
             * Petrol, Diesel, Electric...
             */
            fuel_type: string;
            /**
             * Summer, Winter, All-Season...
             */
            tyres: string;
            /**
             * The transmission type of the vehicle
             */
            transmission: VehicleTransmission;
        }
        export interface VehicleTransmission {
            /**
             * Auto-generated ID
             */
            id?: number;
            /**
             * Type as in automatic, manual or semi-automatic
             */
            type: string;
            /**
             * 4WD, FWD, RWD
             */
            drive: string;
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
    namespace CreateLog {
        export type RequestBody = /**
         * example:
         * {
         *   "id": 1,
         *   "from_location": "123 Main St",
         *   "to_location": "456 Elm St",
         *   "start_date": "2023-10-01T08:00:00Z",
         *   "end_date": "2023-10-01T09:00:00Z",
         *   "start_odometer": 1000.5,
         *   "end_odometer": 1025.7,
         *   "employeeId": 1,
         *   "bookingId": 1
         * }
         */
        Components.Schemas.Log;
        namespace Responses {
            export type $201 = /**
             * example:
             * {
             *   "id": 1,
             *   "from_location": "123 Main St",
             *   "to_location": "456 Elm St",
             *   "start_date": "2023-10-01T08:00:00Z",
             *   "end_date": "2023-10-01T09:00:00Z",
             *   "start_odometer": 1000.5,
             *   "end_odometer": 1025.7,
             *   "employeeId": 1,
             *   "bookingId": 1
             * }
             */
            Components.Schemas.Log;
        }
    }
    namespace CreateMaintenance {
        export type RequestBody = Components.Schemas.Maintenance;
        namespace Responses {
            export type $201 = Components.Schemas.Maintenance;
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
    namespace DeleteLog {
        export type RequestBody = /**
         * example:
         * {
         *   "id": 1,
         *   "from_location": "123 Main St",
         *   "to_location": "456 Elm St",
         *   "start_date": "2023-10-01T08:00:00Z",
         *   "end_date": "2023-10-01T09:00:00Z",
         *   "start_odometer": 1000.5,
         *   "end_odometer": 1025.7,
         *   "employeeId": 1,
         *   "bookingId": 1
         * }
         */
        Components.Schemas.Log;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteMaintenance {
        export type RequestBody = Components.Schemas.Maintenance;
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
    namespace GetAllBookings {
        namespace Responses {
            export type $200 = Components.Schemas.Booking[];
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
    namespace GetAllLogs {
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "id": 1,
             *   "from_location": "123 Main St",
             *   "to_location": "456 Elm St",
             *   "start_date": "2023-10-01T08:00:00Z",
             *   "end_date": "2023-10-01T09:00:00Z",
             *   "start_odometer": 1000.5,
             *   "end_odometer": 1025.7,
             *   "employeeId": 1,
             *   "bookingId": 1
             * }
             */
            Components.Schemas.Log[];
        }
    }
    namespace GetAvailableVehicleById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Booking | null;
            export interface $404 {
            }
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
    namespace GetEmployeeBookingsById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Booking[];
        }
    }
    namespace GetEmployeeById {
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
    namespace GetEmployeeCurrentBookingsById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Booking[];
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
            export type $200 = /**
             * example:
             * {
             *   "id": 1,
             *   "from_location": "123 Main St",
             *   "to_location": "456 Elm St",
             *   "start_date": "2023-10-01T08:00:00Z",
             *   "end_date": "2023-10-01T09:00:00Z",
             *   "start_odometer": 1000.5,
             *   "end_odometer": 1025.7,
             *   "employeeId": 1,
             *   "bookingId": 1
             * }
             */
            Components.Schemas.Log;
        }
    }
    namespace GetMaintenanceById {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Maintenance;
        }
    }
    namespace GetMaintenances {
        namespace Responses {
            export type $200 = Components.Schemas.Maintenance[];
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
    namespace GetVehicleImage {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = string; // arraybuffer
            export interface $404 {
            }
        }
    }
    namespace GetVehicles {
        namespace Responses {
            export type $200 = Components.Schemas.Vehicle[];
        }
    }
    namespace Login {
        export interface RequestBody {
            username?: string;
            password?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Employee;
            export interface $401 {
            }
        }
    }
    namespace UpdateBooking {
        export type RequestBody = Components.Schemas.Booking;
        namespace Responses {
            export type $200 = Components.Schemas.Booking;
        }
    }
    namespace UpdateCompany {
        export type RequestBody = Components.Schemas.Company;
        namespace Responses {
            export type $200 = Components.Schemas.Company;
        }
    }
    namespace UpdateEmployee {
        export type RequestBody = Components.Schemas.Employee;
        namespace Responses {
            export type $200 = Components.Schemas.Employee;
        }
    }
    namespace UpdateLog {
        export type RequestBody = /**
         * example:
         * {
         *   "id": 1,
         *   "from_location": "123 Main St",
         *   "to_location": "456 Elm St",
         *   "start_date": "2023-10-01T08:00:00Z",
         *   "end_date": "2023-10-01T09:00:00Z",
         *   "start_odometer": 1000.5,
         *   "end_odometer": 1025.7,
         *   "employeeId": 1,
         *   "bookingId": 1
         * }
         */
        Components.Schemas.Log;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "id": 1,
             *   "from_location": "123 Main St",
             *   "to_location": "456 Elm St",
             *   "start_date": "2023-10-01T08:00:00Z",
             *   "end_date": "2023-10-01T09:00:00Z",
             *   "start_odometer": 1000.5,
             *   "end_odometer": 1025.7,
             *   "employeeId": 1,
             *   "bookingId": 1
             * }
             */
            Components.Schemas.Log;
        }
    }
    namespace UpdateMaintenance {
        export type RequestBody = Components.Schemas.Maintenance;
        namespace Responses {
            export type $200 = Components.Schemas.Maintenance;
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
   * updateEmployee - Update an existing employee
   */
  'updateEmployee'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateEmployee.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateEmployee.Responses.$200>
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
   * getEmployeeById - Get employee by ID
   */
  'getEmployeeById'(
    parameters?: Parameters<Paths.GetEmployeeById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEmployeeById.Responses.$200>
  /**
   * getEmployeeBookingsById - Get employee bookings by ID
   */
  'getEmployeeBookingsById'(
    parameters?: Parameters<Paths.GetEmployeeBookingsById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEmployeeBookingsById.Responses.$200>
  /**
   * getEmployeeCurrentBookingsById - Get employee current bookings by employee ID
   */
  'getEmployeeCurrentBookingsById'(
    parameters?: Parameters<Paths.GetEmployeeCurrentBookingsById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEmployeeCurrentBookingsById.Responses.$200>
  /**
   * login - Employee login
   */
  'login'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Login.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Login.Responses.$200>
  /**
   * getVehicleImage - Get vehicle image
   */
  'getVehicleImage'(
    parameters?: Parameters<Paths.GetVehicleImage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetVehicleImage.Responses.$200>
  /**
   * getAllLogs - Get all logs
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
   * getMaintenances - Get all maintenance records
   */
  'getMaintenances'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMaintenances.Responses.$200>
  /**
   * updateMaintenance - Update a maintenance record
   */
  'updateMaintenance'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateMaintenance.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMaintenance.Responses.$200>
  /**
   * createMaintenance - Create a new maintenance record
   */
  'createMaintenance'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateMaintenance.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMaintenance.Responses.$201>
  /**
   * deleteMaintenance - Delete a maintenance record
   */
  'deleteMaintenance'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteMaintenance.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteMaintenance.Responses.$200>
  /**
   * getMaintenanceById - Get maintenance record by ID
   */
  'getMaintenanceById'(
    parameters?: Parameters<Paths.GetMaintenanceById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMaintenanceById.Responses.$200>
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
  /**
   * getAvailableVehicleById - Get available vehicle by ID
   */
  'getAvailableVehicleById'(
    parameters?: Parameters<Paths.GetAvailableVehicleById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAvailableVehicleById.Responses.$200>
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
     * updateEmployee - Update an existing employee
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateEmployee.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateEmployee.Responses.$200>
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
    /**
     * getEmployeeById - Get employee by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetEmployeeById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEmployeeById.Responses.$200>
  }
  ['/employees/{id}/bookings']: {
    /**
     * getEmployeeBookingsById - Get employee bookings by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetEmployeeBookingsById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEmployeeBookingsById.Responses.$200>
  }
  ['/employees/{id}/bookings/current']: {
    /**
     * getEmployeeCurrentBookingsById - Get employee current bookings by employee ID
     */
    'get'(
      parameters?: Parameters<Paths.GetEmployeeCurrentBookingsById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEmployeeCurrentBookingsById.Responses.$200>
  }
  ['/employees/login']: {
    /**
     * login - Employee login
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Login.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Login.Responses.$200>
  }
  ['/images/vehicles/{id}']: {
    /**
     * getVehicleImage - Get vehicle image
     */
    'get'(
      parameters?: Parameters<Paths.GetVehicleImage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetVehicleImage.Responses.$200>
  }
  ['/logs']: {
    /**
     * createLog - Create a new log
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateLog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateLog.Responses.$201>
    /**
     * getAllLogs - Get all logs
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
  ['/logs/{id}']: {
    /**
     * getLogById - Get log by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetLogById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLogById.Responses.$200>
  }
  ['/maintenances']: {
    /**
     * createMaintenance - Create a new maintenance record
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateMaintenance.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMaintenance.Responses.$201>
    /**
     * getMaintenances - Get all maintenance records
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMaintenances.Responses.$200>
    /**
     * updateMaintenance - Update a maintenance record
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateMaintenance.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMaintenance.Responses.$200>
    /**
     * deleteMaintenance - Delete a maintenance record
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteMaintenance.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteMaintenance.Responses.$200>
  }
  ['/maintenances/{id}']: {
    /**
     * getMaintenanceById - Get maintenance record by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetMaintenanceById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMaintenanceById.Responses.$200>
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
  ['/vehicles/available/{id}']: {
    /**
     * getAvailableVehicleById - Get available vehicle by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetAvailableVehicleById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAvailableVehicleById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Booking = Components.Schemas.Booking;
export type Company = Components.Schemas.Company;
export type Employee = Components.Schemas.Employee;
export type Log = Components.Schemas.Log;
export type Maintenance = Components.Schemas.Maintenance;
export type PersonalDetails = Components.Schemas.PersonalDetails;
export type Vehicle = Components.Schemas.Vehicle;
export type VehicleRegistration = Components.Schemas.VehicleRegistration;
export type VehicleSpec = Components.Schemas.VehicleSpec;
export type VehicleTransmission = Components.Schemas.VehicleTransmission;
