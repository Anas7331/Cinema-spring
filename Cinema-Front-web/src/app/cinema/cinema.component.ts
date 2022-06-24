
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes:any; public cinemas:any; public salles:any;

  public currentVille: any;
  public currentCinema: any;
  public currentProjection: any;
  public selectedTickets: any = [];

  constructor(public cinemaService:CinemaService) { 
    this.cinemaService.getVilles()
    .subscribe(data => {
        this.villes = data;
    }, err=>{
      console.log(err); 
    })
  }

  ngOnInit(): void {
  }

  onGetCinemas(v: any) {
    this.currentVille = v;
    this.salles=undefined;
    this.cinemaService.getCinemas(v)
    .subscribe((data: any) => {
      this.cinemas = data;
  }, (err: any)=>{
    console.log(err); 
  })
  }

  onGetSalles(c: any) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
    .subscribe((data: any) => {
      this.salles = data;
      this.salles._embedded.salles.forEach((salle: any) => {
        this.cinemaService.getProjections(salle)
        .subscribe((data: any) => {
          salle.projections = data;
      }, (err: any)=>{
        console.log(err); 
      })
      });
    }, (err: any)=>{
      console.log(err);
    })
  }

  onGetTicketsPlaces(p: any) {
    this.currentProjection=p;
    this.cinemaService.getTicketsPlaces(p)
    .subscribe((data: any) => {
      this.currentProjection.tickets=data;
  }, (err: any)=>{
    console.log(err); 
  })
  }

  onSelectTicket(t: any) {
    if(!t.selected) {
      t.selected=true;
      this.selectedTickets.push(t);
    } else {
      t.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);
    }
  }

  getTicketClass(t: any) {
    let str="btn ";
    if(t.reserve==true) {
      str+="btn-danger"
    } else if(t.selected) {
      str+="btn-warning"
    } else {
      str+="btn-success"
    }

    return str;
  }

  onPayTickets(dataForm: any) {
    let tickets: any = [];
    this.selectedTickets.forEach((t:any) =>{
      tickets.push(t.id);
    })
    dataForm.tickets = tickets;
    console.log(dataForm);
    this.cinemaService.payerTickets(dataForm)
    .subscribe((data: any) => {
      alert("Tickets réservés avec succès!");
  }, (err: any)=>{
    console.log(err); 
  })
  }
  

}

