import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute,Params} from '@angular/router';
import {Client} from '../../models/Client';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {

	id:string;
	client:Client;
	hasBalance:boolean = false;
	showBalanceUpdateInput: boolean = false;

  constructor(
  	private clientService:ClientService,
  	private router:Router,
  	private route:ActivatedRoute,
  	private flasshMessagesService:FlashMessagesService) { }

  ngOnInit() {

  	this.id = this.route.snapshot.params['id'];
  	this.clientService.getClient(this.id).subscribe( client =>{
  		if(client.balance > 0){
  			this.hasBalance = true;
  		}
  		this.client = client;
  		console.log(this.client);

  	})
  }

  updateBalance(id:string){
  	this.clientService.updateClient(this.id, this.client);
  	this.flasshMessagesService.show('Update balance success', {
  		cssClass:'alert-success',timeout:4000
  	} );
  	this.router.navigate(['/client/'+ this.id]);

  }

  onDeleteClick(){
  	if(confirm("Are you sure to delete?")){
  		this.clientService.deleteClient(this.id);
  		this.flasshMessagesService.show('Client removed',{
  			cssClass:'alert-success', timeout:4000
  		});
  		this.router.navigate(['/']);
  	}
  }

}
