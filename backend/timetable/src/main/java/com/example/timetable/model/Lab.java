package com.example.timetable.model;

public class Lab {
    private int labId;
    private String subjectName;
    private int totalLecturePerWeek;

    public Lab() {}

    public Lab(int labId, String subjectName, int totalLecturePerWeek) {
        this.labId = labId;
        this.subjectName = subjectName;
        this.totalLecturePerWeek = totalLecturePerWeek;
    }

    // getters & setters

    public int getLabId() {
        return labId;
    }

    public void setLabId(int labId) {
        this.labId = labId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public int getTotalLecturePerWeek() {
        return totalLecturePerWeek;
    }

    public void setTotalLecturePerWeek(int totalLecturePerWeek) {
        this.totalLecturePerWeek = totalLecturePerWeek;
    }
}
