#include<iostream>
#include<windows.h>

using namespace std;

void runCommand(){
    const string generatePy = ".\\automate\\GenerateImageVideos.py";
    const string cmd = "python " + generatePy;
    cout<<"Working...\n";
    const string files[] = {"DB.json", "index.html", "Src.js"};
    for(int i=0;i<3;i++){
        Sleep(200);
        cout<<files[i]<<endl;
    }
    system("title AutoMate");
    system(cmd.c_str());
    cout<<"\n\n";
    cout<<"--------\n";
    cout<<"| Done |\n";
    cout<<"--------\n";
    Sleep(800);
}

int main(){
    runCommand();
    
    // cout<<"Press any key to continue...";
    // cin.get();

    return 0;
}
