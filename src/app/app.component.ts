import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./services/loading.service";
import { MessageService } from "./services/message.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  logout() {}
}
