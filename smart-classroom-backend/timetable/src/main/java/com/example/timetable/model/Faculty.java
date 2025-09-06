package com.example.timetable.model;

public class Faculty {
    private int facultyId;
    private String subjectName;
    private int totalLecturePerWeek;

    public Faculty() {}

    public Faculty(int facultyId, String subjectName, int totalLecturePerWeek) {
        this.facultyId = facultyId;
        this.subjectName = subjectName;
        this.totalLecturePerWeek = totalLecturePerWeek;
    }

    public int getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(int facultyId) {
        this.facultyId = facultyId;
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
