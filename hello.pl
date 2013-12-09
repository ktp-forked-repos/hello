#!/usr/bin/perl
use strict;
use warnings;

# @see http://www.perlmonks.org/?node_id=88222
use Getopt::Std;
my %args;
getopts('h',\%args);

sub usage() {
    print <<END
Usage: program [options]
END
}

## main
if( $args{h} ) {
    usage();
    exit(1);
}

my $v={
    "a" => [3,1],
    "b" => [4,2],
};

print "hash \$v:\n"; print "$_=\n" for (keys %$v);

my @arr=(3,9,4);
print "======\n";
print @arr;

print "hash \$v:\n"; print "$_=>[".join(" ",@{$v->{$_}})."]\n" for (keys %$v);
print "array @arr:\n"; print "(".join(" ",@arr).")\n";


