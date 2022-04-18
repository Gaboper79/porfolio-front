import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { SkillI } from "../model/skill";

@Injectable({
  providedIn: "root",
})
export class SkillService {
  skillList!: SkillI[];
  private skill$: Subject<SkillI[]>;
  Url = "http://localhost:8080/api/skill";

  constructor(private http: HttpClient) {
    this.skill$ = new Subject();
    this.http.get<SkillI[]>(this.Url).subscribe((res) => {
      this.skillList = res;
      this.skill$.next(this.skillList);
    });
  }
  getSkill$(): Observable<SkillI[]> {
    return this.skill$.asObservable();
  }
  getAllSkill(): Observable<SkillI[]> {
    return this.http.get<SkillI[]>(this.Url);
  }
  addSkill(skill: SkillI) {
    this.http.post(this.Url + "/add", skill).subscribe((res) => {});
    this.skillList.push(skill);
    this.skill$.next(this.skillList);
  }
  updateSkill(skill: SkillI, item: number) {
    this.http.put(this.Url, skill).subscribe();
    this.skillList[item] = skill;
    this.skill$.next(this.skillList);
  }
  deleteSkill(skill: SkillI, item: number) {
    this.http.delete(this.Url + "/" + skill.id).subscribe();
    this.skillList.splice(item, 1);
    this.skill$.next(this.skillList);
  }
}
