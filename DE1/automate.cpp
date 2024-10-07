#include<iostream>
using namespace std;

void runCommand(){
    const string generatePy = ".\\automate\\GenerateImageVideos.py";
    const string cmd = "python " + generatePy;
    cout<<"Working...\n\n";
    system("title AutoMate");
    system(cmd.c_str());
    cout<<"Done\n";
}

int main(){
    runCommand();
    
    cout<<"Press any key to continue...";
    cin.get();

    return 0;
}