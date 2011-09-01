package org.oreilly.learningUML2.ch01.codemodel;
 
public class Guitarist extends Person implements MusicPlayer {
 
   Guitar favoriteGuitar;
 
   public Guitarist (String name) {
      super(name);
   }
 
   // A couple of local methods for accessing the class's properties
   public void setInstrument(Instrument instrument) {
      if (instrument instanceof Guitar) {
         this.favoriteGuitar = (Guitar) instrument;
      }
      else {
         System.out.println("I'm not playing that thing!");
      }
   }
 
    public Instrument getInstrument(  ) {
      return this.favoriteGuitar;
   }
 
   // Better implement this method as MusicPlayer requires it
   public void play(  ) {
      System.out.println(super.getName(  ) + "is going to do play the guitar now ...");
 
      if (this.favoriteGuitar != null) {
         for (int strum = 1; strum < 500; strum++) {
            this.favoriteGuitar.strum(  );
         }
         System.out.println("Phew! Finished all that hard playing");
      }
      else {
         System.out.println("You haven't given me a guitar yet!");
      }
   }
 
   // I'm a main program so need to implement this as well
   public static void main(String[] args) {
      MusicPlayer player = new Guitarist("Russ");
      player.setInstrument(new Guitar("Burns Brian May Signature"));
      player.play(  );
   }
}

