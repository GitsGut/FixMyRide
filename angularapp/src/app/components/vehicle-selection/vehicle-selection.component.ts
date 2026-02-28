import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleDetailsService } from 'src/app/services/vehicle-details.service';

@Component({
  selector: 'app-vehicle-selection',
  templateUrl: './vehicle-selection.component.html',
  styleUrls: ['./vehicle-selection.component.css']
})
export class VehicleSelectionComponent {

  
  vehicleType: string = '';
  showForm: boolean = false;
  errorMessage: string = '';
  isError: boolean = false;
  

  vehicle: Vehicle = {
    vehicleType: '',
    brandName: '',
    modelName: '',
    fuelType: ''
  };

  bikeBrands = [
    { name: 'Aprilia' },
    { name: 'Ather' },
    { name: 'Bajaj' },
    { name: 'Benelli' },
    { name: 'BMW Motorrad' },
    { name: 'Hero' },
    { name: 'Hero Electric' },
    { name: 'Honda' },
    { name: 'Husqvarna' },
    { name: 'Jawa' },
    { name: 'KTM' },
    { name: 'Ola Electric' },
    { name: 'Royal Enfield' },
    { name: 'Suzuki' },
    { name: 'Triumph' },
    { name: 'TVS' },
    { name: 'Ultraviolette' },
    { name: 'Vespa' },
    { name: 'Yamaha' },
    { name: 'Yezdi' },
    { name: 'Revolt' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  carBrands = [
    { name: 'Audi' },
    { name: 'BMW' },
    { name: 'BYD' },
    { name: 'Citroen' },
    { name: 'Fiat' },       
    { name: 'Ford' },       
    { name: 'Honda' },
    { name: 'Hyundai' },
    { name: 'Jeep' },
    { name: 'Kia' },
    { name: 'Lexus' },
    { name: 'Mahindra' },
    { name: 'Maruti Suzuki' },
    { name: 'MG' },
    { name: 'Mercedes-Benz' },
    { name: 'Nissan' },
    { name: 'Renault' },
    { name: 'Skoda' },
    { name: 'Tata' },
    { name: 'Toyota' },
    { name: 'Volkswagen' },
    { name: 'Volvo' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  bikeModels = [
    
    { name: 'SR 160', brand: 'Aprilia' },
    { name: 'SR 125', brand: 'Aprilia' },
    
    { name: '450X', brand: 'Ather' },
    { name: '450S', brand: 'Ather' },
    
    { name: 'Pulsar 150', brand: 'Bajaj' },
    { name: 'Pulsar NS200', brand: 'Bajaj' },
    { name: 'Pulsar 220F', brand: 'Bajaj' },
    { name: 'Avenger Street 160', brand: 'Bajaj' },
    { name: 'CT 100', brand: 'Bajaj' },
    { name: 'Platina 110', brand: 'Bajaj' },
    { name: 'Dominar 250', brand: 'Bajaj' },
    { name: 'Dominar 400', brand: 'Bajaj' },
    
    { name: 'Imperiale 400', brand: 'Benelli' },
    
    { name: 'G 310 R', brand: 'BMW Motorrad' },
    { name: 'G 310 GS', brand: 'BMW Motorrad' },
    
    { name: 'Splendor Plus', brand: 'Hero' },
    { name: 'HF Deluxe', brand: 'Hero' },
    { name: 'Passion Pro', brand: 'Hero' },
    { name: 'Glamour', brand: 'Hero' },
    { name: 'Super Splendor', brand: 'Hero' },
    { name: 'Xpulse 200', brand: 'Hero' },
    { name: 'Maestro Edge', brand: 'Hero' },
    { name: 'Destini 125', brand: 'Hero' },
    
    { name: 'Optima', brand: 'Hero Electric' },
    { name: 'Photon', brand: 'Hero Electric' },
    
    { name: 'Activa 6G', brand: 'Honda' },
    { name: 'Dio', brand: 'Honda' },
    { name: 'Shine', brand: 'Honda' },
    { name: 'SP125', brand: 'Honda' },
    { name: 'Hornet 2.0', brand: 'Honda' },
    { name: 'H’ness CB350', brand: 'Honda' },
    { name: 'Unicorn', brand: 'Honda' },
    
    { name: 'Vitpilen 250', brand: 'Husqvarna' },
    { name: 'Svartpilen 250', brand: 'Husqvarna' },
    
    { name: 'Jawa Classic', brand: 'Jawa' },
    { name: 'Forty Two', brand: 'Jawa' },
    
    { name: 'Duke 200', brand: 'KTM' },
    { name: 'Duke 250', brand: 'KTM' },
    { name: 'Duke 390', brand: 'KTM' },
    { name: 'RC 125', brand: 'KTM' },
    { name: 'RC 200', brand: 'KTM' },
    { name: 'RC 390', brand: 'KTM' },
    
    { name: 'S1 Air', brand: 'Ola Electric' },
    { name: 'S1 Pro', brand: 'Ola Electric' },
    
    { name: 'RV400', brand: 'Revolt' },
    
    { name: 'Bullet 350', brand: 'Royal Enfield' },
    { name: 'Classic 350', brand: 'Royal Enfield' },
    { name: 'Hunter 350', brand: 'Royal Enfield' },
    { name: 'Meteor 350', brand: 'Royal Enfield' },
    { name: 'Himalayan 411', brand: 'Royal Enfield' },
    
    { name: 'Access 125', brand: 'Suzuki' },
    { name: 'Burgman Street', brand: 'Suzuki' },
    { name: 'Gixxer 155', brand: 'Suzuki' },
    { name: 'Gixxer SF 250', brand: 'Suzuki' },
    
    { name: 'Speed 400', brand: 'Triumph' },
    { name: 'Scrambler 400X', brand: 'Triumph' },
    
    { name: 'Apache RTR 160', brand: 'TVS' },
    { name: 'Apache RTR 200', brand: 'TVS' },
    { name: 'Raider 125', brand: 'TVS' },
    { name: 'Jupiter', brand: 'TVS' },
    { name: 'NTorq 125', brand: 'TVS' },
    
    { name: 'F77', brand: 'Ultraviolette' },
  
    { name: 'SXL 125', brand: 'Vespa' },
    { name: 'VXL 125', brand: 'Vespa' },
   
    { name: 'FZ-S V3', brand: 'Yamaha' },
    { name: 'MT-15', brand: 'Yamaha' },
    { name: 'R15 V4', brand: 'Yamaha' },
    { name: 'Fascino 125', brand: 'Yamaha' },
    { name: 'Ray ZR 125', brand: 'Yamaha' },
    
    { name: 'Roadster', brand: 'Yezdi' },
    { name: 'Scrambler', brand: 'Yezdi' },
    { name: 'Adventure', brand: 'Yezdi' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  
  carModels = [
    
    { name: 'A4', brand: 'Audi' },
    { name: 'Q3', brand: 'Audi' },
    { name: 'Q5', brand: 'Audi' },
    
    { name: '2 Series Gran Coupe', brand: 'BMW' },
    { name: '3 Series', brand: 'BMW' },
    { name: 'X1', brand: 'BMW' },
    { name: 'X3', brand: 'BMW' },
    
    { name: 'Atto 3', brand: 'BYD' },
    { name: 'Seal', brand: 'BYD' },
    
    { name: 'C3', brand: 'Citroen' },
    { name: 'C3 Aircross', brand: 'Citroen' },
    { name: 'eC3', brand: 'Citroen' },
   
    { name: 'Punto', brand: 'Fiat' },
    { name: 'Linea', brand: 'Fiat' },
    
    { name: 'EcoSport', brand: 'Ford' },
    { name: 'Figo', brand: 'Ford' },
    { name: 'Endeavour', brand: 'Ford' },
 
    { name: 'Amaze', brand: 'Honda' },
    { name: 'City', brand: 'Honda' },
    { name: 'Elevate', brand: 'Honda' },
    
    { name: 'Alcazar', brand: 'Hyundai' },
    { name: 'Aura', brand: 'Hyundai' },
    { name: 'Creta', brand: 'Hyundai' },
    { name: 'Exter', brand: 'Hyundai' },
    { name: 'i20', brand: 'Hyundai' },
    { name: 'Venue', brand: 'Hyundai' },
    { name: 'Verna', brand: 'Hyundai' },
    
    { name: 'Compass', brand: 'Jeep' },
    { name: 'Meridian', brand: 'Jeep' },
  
    { name: 'Carens', brand: 'Kia' },
    { name: 'EV6', brand: 'Kia' },
    { name: 'Seltos', brand: 'Kia' },
    { name: 'Sonet', brand: 'Kia' },
    
    { name: 'ES', brand: 'Lexus' },
    { name: 'NX', brand: 'Lexus' },
    
    { name: 'Bolero', brand: 'Mahindra' },
    { name: 'Scorpio-N', brand: 'Mahindra' },
    { name: 'Thar', brand: 'Mahindra' },
    { name: 'XUV300', brand: 'Mahindra' },
    { name: 'XUV700', brand: 'Mahindra' },
    
    { name: 'Alto K10', brand: 'Maruti Suzuki' },
    { name: 'Baleno', brand: 'Maruti Suzuki' },
    { name: 'Brezza', brand: 'Maruti Suzuki' },
    { name: 'Celerio', brand: 'Maruti Suzuki' },
    { name: 'Dzire', brand: 'Maruti Suzuki' },
    { name: 'Ertiga', brand: 'Maruti Suzuki' },
    { name: 'Fronx', brand: 'Maruti Suzuki' },
    { name: 'Grand Vitara', brand: 'Maruti Suzuki' },
    { name: 'Ignis', brand: 'Maruti Suzuki' },
    { name: 'Swift', brand: 'Maruti Suzuki' },
    { name: 'Wagon R', brand: 'Maruti Suzuki' },
  
    { name: 'Astor', brand: 'MG' },
    { name: 'Gloster', brand: 'MG' },
    { name: 'Hector', brand: 'MG' },
    { name: 'ZS EV', brand: 'MG' },
    
    { name: 'C-Class', brand: 'Mercedes-Benz' },
    { name: 'GLA', brand: 'Mercedes-Benz' },
    { name: 'GLC', brand: 'Mercedes-Benz' },
    
    { name: 'Magnite', brand: 'Nissan' },
    
    { name: 'Kiger', brand: 'Renault' },
    { name: 'Kwid', brand: 'Renault' },
    { name: 'Triber', brand: 'Renault' },
    
    { name: 'Kushaq', brand: 'Skoda' },
    { name: 'Slavia', brand: 'Skoda' },
   
    { name: 'Altroz', brand: 'Tata' },
    { name: 'Harrier', brand: 'Tata' },
    { name: 'Nexon', brand: 'Tata' },
    { name: 'Punch', brand: 'Tata' },
    { name: 'Safari', brand: 'Tata' },
    { name: 'Tiago', brand: 'Tata' },
    { name: 'Tigor', brand: 'Tata' },
  
    { name: 'Fortuner', brand: 'Toyota' },
    { name: 'Glanza', brand: 'Toyota' },
    { name: 'Hyryder', brand: 'Toyota' },
    { name: 'Innova Crysta', brand: 'Toyota' },
    { name: 'Innova Hycross', brand: 'Toyota' },
    { name: 'Urban Cruiser Taisor', brand: 'Toyota' },
   
    { name: 'Taigun', brand: 'Volkswagen' },
    { name: 'Virtus', brand: 'Volkswagen' },
    
    { name: 'XC40', brand: 'Volvo' },
    { name: 'XC60', brand: 'Volvo' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  bikeFuelTypes = [
    { name: 'Electric' },
    { name: 'Petrol' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  carFuelTypes = [
    { name: 'CNG' },
    { name: 'Diesel' },
    { name: 'Electric' },
    { name: 'Hybrid' },
    { name: 'Petrol' }
  ].sort((a, b) => a.name.localeCompare(b.name));
   

  brands = [];
  models = [];
  filteredModels = [];
  fuelTypes = [];

  constructor(private service: VehicleDetailsService, private router: Router) {}

  selectVehicleType(type: string): void {
    this.vehicleType = type;
    this.vehicle.vehicleType = type;
    this.showForm = true;

    if (type === 'Bike') {
      this.brands = this.bikeBrands;
      this.models = this.bikeModels;
      this.fuelTypes = this.bikeFuelTypes;
    } else if (type === 'Car') {
      this.brands = this.carBrands;
      this.models = this.carModels;
      this.fuelTypes = this.carFuelTypes;
    }

   
    this.vehicle.brandName = '';
    this.vehicle.modelName = '';
    this.filteredModels = [];
  }

  onBrandChange(): void {
    this.filteredModels = this.models.filter(model => model.brand === this.vehicle.brandName);
    this.vehicle.modelName = '';
  }

  submitForm(): void {
    this.service.createVehicle(this.vehicle).subscribe({
      next: (res) => {
        console.log(res)
        const route = this.vehicleType === 'Bike' ? '/user/services/bike' : '/user/services/car';
        this.router.navigate([route,res.vehicleId]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = typeof err.error === 'string'
          ? err.error
          : err.error.message || 'Unexpected error occurred';
        this.isError = true;
      }
    });
  }

}
