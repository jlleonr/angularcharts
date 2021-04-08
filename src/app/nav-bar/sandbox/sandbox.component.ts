import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  allowNewServer: boolean = false;
  clicked: boolean = false;
  serverCreationStatus: string = 'No Server created!';
  oneWayServerName: string = '';
  serverName: string = '';
  serverStatus:string = 'offline';
  servers: string[] = ['server 1', 'server 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
    this.setStatus();   
  }

  private setStatus() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  public onCreateServer() {
    this.clicked = true;
    this.oneWayServerName = this.serverName;
    this.setStatus();
    this.servers.push(this.serverName);   
    this.serverCreationStatus = 'Server was created! Name is: '  + this.serverName;
  }

  public onUpdateServerName(event: any) {
    this.serverName = event.target.value;    
  }
  public getColor(){
    return this.serverStatus === 'online' ? 'green' : 'red';
  }

  ngOnInit() {
  }

}
