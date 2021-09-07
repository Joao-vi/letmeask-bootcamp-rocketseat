void led_sequence(char get){

{
for (int j=0; j<=7; j++) 
{
PORTD = get << j; //LED move Left Sequence 
__delay_ms(200);
}
for (int j=7; j>=0; j--)
{
PORTD = get << j; //LED move Left Sequence 
__delay_ms(200);
} 
}
}