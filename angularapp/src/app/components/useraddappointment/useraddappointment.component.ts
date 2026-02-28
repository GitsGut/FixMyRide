import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/models/address.model';
import { Appointment } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { VehicleMaintenance } from 'src/app/models/vehicle-maintenance.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { VehicleDetailsService } from 'src/app/services/vehicle-details.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { RazorpayPaymentService } from 'src/app/services/razorpay-payment.service';
import { RazorpayPayment } from 'src/app/models/razorpay-payment';

@Component({
  selector: 'app-useraddappointment',
  templateUrl: './useraddappointment.component.html',
  styleUrls: ['./useraddappointment.component.css']
})
export class UseraddappointmentComponent implements OnInit {

  paymentType: string = '';
  selectedDate: string = '';
  selectedSlot: string = '';
  dates: { label: string, value: string }[] = [];
  morningSlots = ['9 - 10AM', '10 - 11AM', '11 - 12PM'];
  afternoonSlots = ['1 - 2PM', '2 - 3PM', '3 - 4PM'];
  eveningSlots = ['4 - 5PM', '5 - 6PM', '6 - 7PM'];

  serviceId!: number;
  vehicleId!: number;
  userId: number;

  user!: User;
  newAppointment!: Appointment;
  service!: VehicleMaintenance;
  vehicle!: Vehicle;
  savedAddress!: Address;

  errorMessage: string = '';
  isError: boolean = false;

  showDateTimeSelection = true;
  showOnlyAddress = false;
  showOnlyPayement = false;
  showConfirmModel: boolean = false;


  newAddress: Address = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  };

  states: string[] = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
    'Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir',
    'Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra',
    'Manipur','Meghalaya','Mizoram','Nagaland','Odisha',
    'Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
    'Tripura','Uttarakhand','Uttar Pradesh','West Bengal'
  ];
  
  citiesByState: Record<string, string[]> = {
    'Andhra Pradesh': [
      'Anantapur','Bhimavaram','Chittoor','Eluru','Guntur','Hindupur','Kadapa',
      'Kakinada','Machilipatnam','Nandyal','Nellore','Ongole','Rajahmundry',
      'Srikakulam','Tenali','Tirupati','Visakhapatnam','Vijayawada','Vizianagaram'
    ],
    'Arunachal Pradesh': [
      'Bomdila','Changlang','Itanagar','Naharlagun','Pasighat','Roing','Tawang','Tezu','Ziro'
    ],
    'Assam': [
      'Barpeta','Bongaigaon','Dhubri','Dibrugarh','Goalpara','Golaghat','Guwahati',
      'Haflong','Hojai','Jorhat','Karimganj','Nagaon','Silchar','Sivasagar','Tezpur','Tinsukia'
    ],
    'Bihar': [
      'Arrah','Aurangabad','Begusarai','Bhagalpur','Bettiah','Chhapra','Darbhanga',
      'Gaya','Jehanabad','Katihar','Munger','Muzaffarpur','Nawada','Patna','Purnia',
      'Saharsa','Samastipur','Siwan','Sitamarhi'
    ],
    'Chhattisgarh': [
      'Ambikapur','Bilaspur','Bhilai','Dhamtari','Durg','Jagdalpur','Kanker','Kondagaon',
      'Korba','Mahasamund','Raigarh','Raipur','Rajnandgaon','Surajpur'
    ],
    'Goa': [
      'Bicholim','Canacona','Mapusa','Margao','Panaji','Ponda','Quepem','Vasco da Gama'
    ],
    'Gujarat': [
      'Ahmedabad','Anand','Bharuch','Bhavnagar','Dahod','Gandhinagar','Godhra','Himmatnagar',
      'Jamnagar','Junagadh','Mehsana','Morbi','Nadiad','Navsari','Palanpur','Porbandar',
      'Rajkot','Surat','Surendranagar','Vadodara','Valsad','Vapi','Veraval'
    ],
    'Haryana': [
      'Ambala','Bahadurgarh','Bhiwani','Charkhi Dadri','Faridabad','Fatehabad','Gurugram',
      'Hisar','Jind','Kaithal','Karnal','Kurukshetra','Palwal','Panipat','Rewari',
      'Rohtak','Sirsa','Sonipat','Yamunanagar'
    ],
    'Himachal Pradesh': [
      'Bilaspur','Chamba','Dharamshala','Hamirpur','Kangra','Keylong','Kinnaur','Kullu',
      'Mandi','Nahan','Palampur','Shimla','Solan','Una'
    ],
    'Jammu and Kashmir': [
      'Anantnag','Bandipora','Baramulla','Budgam','Doda','Jammu','Kathua','Kishtwar',
      'Kulgam','Kupwara','Poonch','Pulwama','Rajouri','Ramban','Reasi','Samba',
      'Shopian','Srinagar','Udhampur'
    ],
    'Jharkhand': [
      'Bokaro','Chaibasa','Daltonganj','Deoghar','Dhanbad','Dumka','Giridih','Godda',
      'Hazaribagh','Jamshedpur','Lohardaga','Pakur','Ramgarh','Ranchi','Sahibganj','Simdega'
    ],
    'Karnataka': [
      'Ballari','Belagavi','Bengaluru','Bidar','Chikkamagaluru','Davanagere','Dharwad',
      'Hassan','Hubballi','Kalaburagi','Kolar','Mangaluru','Mysuru','Raichur','Ramanagara',
      'Shivamogga','Tumakuru','Udupi','Vijayapura','Yadgir'
    ],
    'Kerala': [
      'Alappuzha','Chalakudy','Idukki','Kannur','Kasaragod','Kochi','Kollam','Kottayam',
      'Kozhikode','Malappuram','Ottapalam','Palakkad','Pathanamthitta','Thiruvananthapuram',
      'Thrissur','Tirur'
    ],
    'Madhya Pradesh': [
      'Betul','Bhopal','Burhanpur','Chhindwara','Dewas','Guna','Gwalior','Indore',
      'Jabalpur','Khargone','Khandwa','Mandsaur','Neemuch','Narmadapuram','Ratlam',
      'Rewa','Sagar','Satna','Shivpuri','Ujjain','Vidisha'
    ],
    'Maharashtra': [
      'Ahmednagar','Akola','Alibag','Ambernath','Amravati','Aurangabad','Badlapur','Beed',
      'Bhandara','Bhiwandi','Boisar','Chandrapur','Dahanu','Dhule','Gadchiroli','Gondia',
      'Hingoli','Jalgaon','Kamothe','Kalamboli','Karjat','Kalyan-Dombivli','Khopoli',
      'Kolhapur','Latur','Malegaon','Mira-Bhayandar','Mumbai','Nagpur','Nanded','Nashik',
      'Navi Mumbai','Neral','Osmanabad','Palghar','Panvel','Parbhani','Pimpri-Chinchwad',
      'Pune','Sangli-Miraj-Kupwad','Satara','Solapur','Taloja','Thane','Ulhasnagar',
      'Vasai-Virar','Wardha','Washim','Yavatmal'
    ],
    'Manipur': [
      'Bishnupur','Churachandpur','Imphal','Jiribam','Kakching','Senapati','Tamenglong','Thoubal','Ukhrul'
    ],
    'Meghalaya': [
      'Baghmara','Jowai','Mairang','Nongstoin','Resubelpara','Shillong','Tura','Williamnagar'
    ],
    'Mizoram': [
      'Aizawl','Champhai','Kolasib','Lawngtlai','Lunglei','Mamit','Saiha','Serchhip'
    ],
    'Nagaland': [
      'Dimapur','Kiphire','Kohima','Longleng','Mokokchung','Mon','Noklak','Phek','Tuensang','Wokha','Zunheboto'
    ],
    'Odisha': [
      'Angul','Balasore','Bargarh','Baripada','Berhampur','Bhadrak','Bhubaneswar','Cuttack',
      'Dhenkanal','Jajpur','Jharsuguda','Kendrapara','Keonjhar','Koraput','Malkangiri',
      'Nabarangpur','Nayagarh','Puri','Rayagada','Rourkela','Sambalpur'
    ],
    'Punjab': [
      'Amritsar','Barnala','Bathinda','Faridkot','Fazilka','Firozpur','Gurdaspur','Hoshiarpur',
      'Jalandhar','Kapurthala','Ludhiana','Mohali','Moga','Nawanshahr','Pathankot','Patiala',
      'Rupnagar','Sangrur','Tarn Taran'
    ],
    'Rajasthan': [
      'Ajmer','Alwar','Banswara','Barmer','Bharatpur','Bhilwara','Bikaner','Chittorgarh',
      'Dausa','Dungarpur','Hanumangarh','Jaipur','Jaisalmer','Jodhpur','Kota','Nagaur',
      'Pali','Sawai Madhopur','Sikar','Tonk','Udaipur'
    ],
    'Sikkim': [
      'Gangtok','Gyalshing','Jorethang','Mangan','Namchi','Rangpo','Singtam'
    ],
    'Tamil Nadu': [
      'Chennai','Coimbatore','Cuddalore','Dindigul','Erode','Kanchipuram','Karur','Kumbakonam',
      'Madurai','Nagapattinam','Nagercoil','Pudukkottai','Salem','Sivakasi','Thanjavur',
      'Thoothukudi','Tiruchirappalli','Tirunelveli','Tiruppur','Vellore','Villupuram'
    ],
    'Telangana': [
      'Adilabad','Hyderabad','Jagtial','Kamareddy','Karimnagar','Khammam','Mahbubnagar',
      'Mancherial','Nalgonda','Nizamabad','Sangareddy','Siddipet','Suryapet','Vikarabad',
      'Wanaparthy','Warangal'
    ],
    'Tripura': [
      'Agartala','Ambassa','Belonia','Dharmanagar','Kailashahar','Khowai','Kumarghat','Teliamura','Udaipur'
    ],
    'Uttarakhand': [
      'Almora','Bageshwar','Champawat','Dehradun','Haldwani','Haridwar','Kashipur','Nainital',
      'Pauri','Pithoragarh','Rishikesh','Roorkee','Rudrapur','Srinagar (Garhwal)','Tehri'
    ],
    'Uttar Pradesh': [
      'Agra','Aligarh','Ayodhya','Bareilly','Bijnor','Bulandshahr','Etawah','Firozabad',
      'Ghaziabad','Gorakhpur','Hardoi','Jhansi','Kanpur','Lakhimpur Kheri','Lucknow',
      'Mathura','Meerut','Moradabad','Muzaffarnagar','Noida','Prayagraj','Shahjahanpur','Sitapur','Varanasi'
    ],
    'West Bengal': [
      'Asansol','Balurghat','Bankura','Barasat','Barrackpore','Berhampore','Cooch Behar',
      'Durgapur','Haldia','Hooghly','Howrah','Jalpaiguri','Kharagpur','Kolkata','Krishnanagar',
      'Malda','Midnapore','Purulia','Siliguri'
    ]
  };

  create : Date = new Date();
  update : Date = new Date()
razorpayPayment: RazorpayPayment = {
  paymentId: "pay_Mn1234567890",
  orderId: "order_Mn0987654321",
  signature: "abc123xyz456signature",
  currency: "INR",
  status: "Pending",
  amount: 1500,

  createdAt: this.create.toISOString(), // ISO format for backend
  updatedAt: this.update.toISOString(),

  appointment: {} as Appointment // placeholder if you're hardcoding
};

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private userService: UserdetailsService,
    private authService: AuthService,
    private paymentService: RazorpayPaymentService,
    private vehicleService: VehicleService,
    private vehicleDetailService: VehicleDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId = authService.getAuthenticatedUserId();
  }

  ngOnInit(): void {
    this.generateDates(5);

    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user;

      this.serviceId = +this.activatedRoute.snapshot.params['sId'];
      this.vehicleId = +this.activatedRoute.snapshot.params['vId'];

      this.vehicleService.getServiceById(this.serviceId).subscribe({
        next: (svc) => { this.service = svc; },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = typeof err.error === 'string'
            ? err.error : err.error?.message || 'Unexpected error occurred';
          this.isError = true;
        }
      });

      this.vehicleDetailService.getVehicleById(this.vehicleId).subscribe({
        next: (veh) => { this.vehicle = veh; },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = typeof err.error === 'string'
            ? err.error : err.error?.message || 'Unexpected error occurred';
          this.isError = true;
        }
      });
    });
  }

  generateDates(days: number): void {
    const today = new Date();
    this.dates = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const dateNum = date.getDate();
      const label = `${dateNum} ${day}`;
      const value = date.toISOString().split('T')[0];
      this.dates.push({ label, value });
    }
  }

  selectDate(date: string) { this.selectedDate = date; }
  selectSlot(slot: string) { this.selectedSlot = slot; }

  continueToAddress() {
    if (this.selectedDate && this.selectedSlot) {
      this.showDateTimeSelection = false;
      this.showOnlyAddress = true;
      this.isError = false;
      this.errorMessage = '';
    } else {
      this.isError = true;
      this.errorMessage = 'Please select a date and a time slot.';
    }
  }

  onStateChange(): void {
    this.newAddress.city = '';
  }


  get citiesForSelectedState(): string[] {
    return this.citiesByState[this.newAddress.state] ?? [];
  }


  submitAddress(addressForm: NgForm) {
    if (!addressForm.valid) {
      addressForm.form.markAllAsTouched();
      this.isError = true;
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.isError = false;
    this.errorMessage = '';

    this.appointmentService.addAddress(this.newAddress).subscribe({
      next: (response) => {
        this.savedAddress = response;
        this.showOnlyAddress = false;
        this.showOnlyPayement = true;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = typeof err.error === 'string'
          ? err.error : err.error?.message || 'Unexpected error occurred';
        this.isError = true;
      }
    });
  }

  onPaymentCheckboxChange(type: 'payInCash' | 'payOnline', evt: Event) {
    const checked = (evt.target as HTMLInputElement).checked;
    if (!checked) {
      this.paymentType = '';
      this.showConfirmModel = false;
    } else {
      this.paymentType = type;
      this.showConfirmModel = true;
    }
  }

  selectPayment(type: 'payInCash' | 'payOnline') {
    this.paymentType = type;

    this.newAppointment = {
      service: this.service,
      appointmentDate: this.selectedDate,
      status: 'Pending',
      user: this.user,
      slot: this.selectedSlot,
      vehicle: this.vehicle,
      address: this.savedAddress,
      paymentType: this.paymentType
    };

    this.appointmentService.addAppointment(this.newAppointment).subscribe({
      next: (response) => {
        if (this.newAppointment.paymentType === 'payInCash') {
          this.razorpayPayment.appointment = response ;
          this.paymentService.createCashPayment(this.razorpayPayment).subscribe(param=>
            {   console.log(param);
              this.router.navigate(['user/appointments/view']);
            })
        
        } else {
          this.router.navigate(['user/appointment/payment', response.appointmentId]);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = typeof err.error === 'string'
          ? err.error : err.error?.message || 'Unexpected error occurred';
        this.isError = true;
      }
    });
  }

  confirmOrder() {
    this.selectPayment(this.paymentType as 'payInCash' | 'payOnline');
    this.showConfirmModel = false;
  }

  cancelConfirm() {
    this.showConfirmModel = false;
    this.paymentType = '';
  }
}